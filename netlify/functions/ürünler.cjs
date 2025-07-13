<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <title>Ürünler</title>
</head>
<body>
  <h1>Ürünler</h1>
  <div id="urunlerListesi"></div>

  <script>
    fetch('/.netlify/functions/urunler')
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('urunlerListesi');
        data.forEach(urun => {
          const div = document.createElement('div');
          div.innerHTML = `
            <h3>${urun.name}</h3>
            <p>${urun.description}</p>
            <p>Fiyat: ${urun.price} TL</p>
            <img src="${urun.image_url}" alt="${urun.name}" width="150"/>
            <hr/>
          `;
          container.appendChild(div);
        });
      });
  </script>
</body>
</html>
