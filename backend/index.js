const mysql = require('mysql2'); // Change from 'mysql' to 'mysql2'
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',      
    user: process.env.USER_NAME || 'root',  
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'ParkingManagementSystem',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL Database!');
});

// db.query("select * from users", (err, result) => {
//         if(err) {
//             return console.log(err)
//         }
//         return console.log(result)
//     })
    
app.get('/', (req, res) => {
    res.send('MySQL connection successful!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = db;