import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Sadece POST isteği destekleniyor.',
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { ad, email, mesaj } = data;

    const query = 'INSERT INTO iletisim_formu (ad, email, mesaj) VALUES ($1, $2, $3)';
    await pool.query(query, [ad, email, mesaj]);

    return {
      statusCode: 200,
      body: 'Mesaj başarıyla kaydedildi!',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Hata oluştu: ' + error.message,
    };
  }
};
