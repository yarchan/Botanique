require('dotenv').config(); 

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/devices', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM devices');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении данных:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.get('/device_description/:description_id', async (req, res) => {
  const { description_id } = req.params; 
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM device_description WHERE description_id = $1'; 
    const result = await client.query(query, [description_id]);
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении данных:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
