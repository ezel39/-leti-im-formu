import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Netlify'de "Environment Variable" olarak eklenmiş olmalı
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Sadece POST isteklerine izin verilir.' }),
    };
  }

  try {
    const { ad, email, mesaj } = JSON.parse(event.body);

    if (!ad || !email || !mesaj) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Tüm alanlar gereklidir.' }),
      };
    }

    const query = 'INSERT INTO iletisim (ad, email, mesaj) VALUES ($1, $2, $3)';
    const values = [ad, email, mesaj];
    await pool.query(query, values);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Mesaj başarıyla kaydedildi!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
