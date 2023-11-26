const express = require('express');
const app = express();
const port = 5080;


const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres' ,
  host: 'localhost',
  database: 'botanique',
  password: '0000',
  port: 5432
});

async function insertImage() {
  const imagePath = 'C:/Users/yarkr/Desktop/new/4.svg';
  const imageBuffer = fs.readFileSync(imagePath); 

  const base64String = imageBuffer.toString('base64'); 

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const queryText = 'INSERT INTO devices (device_id, name, status, notice, img) VALUES ($1, $2, $3, $4, $5)';
    const values = ['1', 'Коагулометр Tcoag, KC 4 Delta ', true, 3, base64String]; 

    await client.query(queryText, values);
    await client.query('COMMIT');

    console.log('SVG-изображение успешно добавлено в базу данных.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Ошибка при добавлении SVG-изображения:', error);
  } finally {
    client.release();
  }
}

insertImage();