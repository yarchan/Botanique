require('dotenv').config(); 
const express = require('express');
const app = express();
const port = 5080;


const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const insertDevices = async () => {
  const basePath = './capture/';

  for (let i = 1; i <= 5; i++) {
    const imagePath = `${basePath}${i}.svg`;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString('base64');
    const titles = ['pH-метр Mettler-Toledo International, Inc. SevenCompact S220','Спектрофотометр Varian, Inc Cary 50 Bio','Титратор ','Коагулометр Tcoag, KC 4 Delta','Коагулометр Tcoag, KC 4 Delta']

    const randomValue = Math.floor(Math.random() * 3) + 1;

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const queryText =
        'INSERT INTO devices ( device_id, name, status, notice, img) VALUES ($1, $2, $3, $4, $5)';
      const values = [ i.toString(), titles[i], true, randomValue, base64String];

      await client.query(queryText, values);
      await client.query('COMMIT');

      console.log(`SVG-изображение ${i} успешно добавлено в базу данных.`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`Ошибка при добавлении SVG-изображения ${i}:`, error);
    } finally {
      client.release();
    }
  }
}
const insertDevicesDescription = async () =>{

  for (let i = 1; i <= 5; i++) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const queryText = 'INSERT INTO device_description (description_id, device_id, date_start, type_works, works, result, user_name, checked) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
      const values = [ i.toString(), i.toString(), `200${i}-0${i}-0${i} 1${i}:55:00`, 'Измерение', 'Номер колонки: **Колонка 2**, Образец: **Образец 2**, Образец: **образец 1**, Метод: метов тестовый, Номер колонки: **Колонка 1**', 'Промывка с указанием вещества: Вещество Комментарий: тест успешности', 'moroz', true ];

      await client.query(queryText, values);
      await client.query('COMMIT');

      console.log(`SVG-изображение ${i} успешно добавлено в базу данных.`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`Ошибка при добавлении данных ${i}:`, error);
    } finally {
      client.release();
    }
  }
}

insertDevices().then(()=>{
  insertDevicesDescription();
})

// -- INSERT INTO device_description (description_id, device_id, date_start, type_works, works, result, user_name, checked)
// -- VALUES (6, 4, '2001-01-01 10:55:00', 'Измерение', 'Номер колонки: **Колонка 2**, Образец: **Образец 2**, Образец: **образец 1**, Метод: метов тестовый, Номер колонки: **Колонка 1**', 'Промывка с указанием вещества: Вещество Комментарий: тест успешности', 'moroz', true);
