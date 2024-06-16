const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = 5000;

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

// Database Initialization
const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS forms (
      id SERIAL PRIMARY KEY,
      form_type VARCHAR(10),
      name VARCHAR(100),
      country_code VARCHAR(10),
      phone_number VARCHAR(20)
    )
  `);
};

initDb();

// API Endpoints

app.post('/api/forms', async (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;
  const result = await pool.query(
    'INSERT INTO forms (form_type, name, country_code, phone_number) VALUES ($1, $2, $3, $4) RETURNING *',
    [formType, name, countryCode, phoneNumber]
  );
  res.json(result.rows[0]);
});

app.get('/api/forms', async (req, res) => {
  const result = await pool.query('SELECT * FROM forms');
  res.json(result.rows);
});

app.get('/api/refresh', async (req, res) => {
  const result = await pool.query('SELECT * FROM forms');
  const data = result.rows;

  await axios.post('https://avinsha-spreadsheets.com/update', data);

  res.send('Data synchronized with the online Excel sheet');
});

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
