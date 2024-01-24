const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000; // Change this to your desired port

// Configure database connection
const config = {
    user: 'ya3qoup@hotmail.com',
    password: 'curhi6-qEbfid',
    server: 'JAC-THINKPAD',
    database: 'StateLitigationAuthority',
    options: {
        encrypt: false, // Change to true if using Azure
    },
};

// Define a route to retrieve data from the database
app.get('/departments', async (req, res) => {
    try {
        // Connect to the database
        await sql.connect(config);

        // Query the database
        const result = await sql.query('SELECT * FROM Departments');

        // Send the result as JSON
        res.json(result.recordset);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the database connection
        await sql.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
