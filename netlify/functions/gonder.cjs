const { Client } = require("pg");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Sadece POST kabul edilir.",
    };
  }

  const { ad, email, mesaj } = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    await client.query(
      "INSERT INTO iletisim_formu (ad, email, mesaj) VALUES ($1, $2, $3)",
      [ad, email, mesaj]
    );
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ mesaj: "Veri başarıyla kaydedildi." }),
    };
  } catch (err) {
  console.error("HATA:", err); // Bu satırı zaten var
  return {
    statusCode: 500,
    body: JSON.stringify({ hata: "Sunucu hatası oluştu.", detay: err.message }),
  };
  }
    };
  }
};
