import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../config/db.js"; 

export const registerUser = async (req, res) => {
  const { name, role, email, phone_number, password } = req.body;
  try {
    const [existingUser] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.json({
        success: false,
        message: "User already exists with the same email!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await db.promise().query(
      "INSERT INTO users (name, role, email, phone_number, password) VALUES (?, ?, ?, ?, ?)",
      [name, role, email, phone_number, hashPassword]
    );

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE email = ? OR phone_number = ?",
      [identifier, identifier]
    );

    if (users.length === 0) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const checkUser = users[0];
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password or identifier!",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
        name: checkUser.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "600m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser.id,
        name: checkUser.name,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};