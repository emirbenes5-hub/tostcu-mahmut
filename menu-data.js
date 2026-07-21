// Tostçu Mahmut — Menü verisi
// Kategori sırası aşağıdaki gibi görünür. Her kategoride:
//   urunler: ana ürün listesi
//   menuler: (opsiyonel) { baslik, urunler } — "Menüler" gibi ayrı bir alt liste
// fiyat: null ise kart üzerinde fiyat gösterilmez (henüz belirlenmemiş demektir).
// image: "images/dosya-adi.jpg" — boş bırakılırsa ikonlu placeholder gösterilir.

const MENU = {
  dukkan: {
    ad: "Tostçu Mahmut",
    // Aşağıdaki iletişim bilgilerini gerçek değerlerle değiştir.
    telefon: "0530 013 5201",
    adres: "Yurt, Şair Hasibehatun Cd, 01170 Çukurova/Adana",
    saatler: "Her gün 09:00 – 23:00",
    instagram: "@tostcumahmut",
    instagramUrl: "https://www.instagram.com/tostcumahmut/",
    googleMaps: "https://share.google/UTQpVF2dcserxidPc",
  },
  kategoriler: [
    {
      id: "doner",
      ad: "Döner",
      ikon: "🌯",
      renk: "#c2352f",
      kapak: "images/kapak-doner.jpg",
      urunler: [
        {
          ad: "Klasik Ütü Döner",
          aciklama: "100 gr. Tavuk, Kapya Biber, Patates, Sos.",
          fiyat: 150,
          image: "images/doner-klasik.jpg",
        },
        {
          ad: "Kaşarlı Ütü Döner",
          aciklama: "100 gr. Tavuk, Kapya Biber, Patates, Sos, Kaşar.",
          fiyat: 180,
          image: "images/doner-kasarli.jpg",
        },
        {
          ad: "Cheddarlı Ütü Döner",
          aciklama: "100 gr. Tavuk, Kapya Biber, Patates, Sos, Cheddar.",
          fiyat: 200,
          image: "images/doner-cheddarli.jpg",
        },
      ],
      menuler: {
        baslik: "Menüler",
        urunler: [
          {
            ad: "Bazlama Ekmeğinde Ütü Döner + Kola",
            aciklama: "100 gr. Tavuk, Kapya Biber, Patates, Sos. Yanında kola ile.",
            fiyat: 160,
            image: "images/doner-klasik-kola.jpg",
          },
          {
            ad: "Bazlama Ekmeğinde Kaşarlı Ütü Döner + Kola",
            aciklama: "100 gr. Tavuk, Kapya Biber, Patates, Sos, Kaşar. Yanında kola ile.",
            fiyat: 200,
            image: "images/doner-kasarli-kola.jpg",
          },
          {
            ad: "Bazlama Ekmeğinde Cheddarlı Ütü Döner + Kola",
            aciklama: "100 gr. Tavuk, Kapya Biber, Patates, Sos, Cheddar. Yanında kola ile.",
            fiyat: 220,
            image: "images/doner-cheddarli-kola.jpg",
          },
        ],
      },
    },
    {
      id: "tost",
      ad: "Tost",
      ikon: "🥪",
      renk: "#f6ca45",
      kapak: "images/kapak-tost.jpg",
      urunler: [
        {
          ad: "Kaşarlı Tost",
          aciklama: "Bol kaşar peyniri, tereyağında kızarmış.",
          fiyat: 70,
          image: "images/tost-kasarli.jpg",
        },
        {
          ad: "Karışık Tost",
          aciklama: "Kaşar, sucuk, domates, biber.",
          fiyat: 90,
          image: "images/tost-karisik.jpg",
        },
        {
          ad: "Sucuklu Tost",
          aciklama: "Bol sucuk, kaşar peyniri, tereyağında kızarmış.",
          fiyat: 85,
          image: "images/tost-sucuklu.jpg",
        },
        {
          ad: "Ütü Tost",
          aciklama: "Preslenmiş ekmek arası kaşar, sosis, domates, biber.",
          fiyat: 80,
          image: "images/tost-utu.jpg",
        },
      ],
    },
    {
      id: "atistirmaliklar",
      ad: "Atıştırmalıklar",
      ikon: "🍟",
      renk: "#c2352f",
      kapak: "images/kapak-atistirmalik.jpg",
      urunler: [
        {
          ad: "8'li Soğan Halkası",
          aciklama: "Çıtır çıtır kızarmış, 8 adet.",
          fiyat: 60,
          image: "images/atistirma-sogan.jpg",
        },
        {
          ad: "6'lı Nugget",
          aciklama: "Çıtır tavuk nugget, 6 adet.",
          fiyat: 70,
          image: "images/atistirma-nugget.jpg",
        },
        {
          ad: "Patates Kızartması",
          aciklama: "Taze kızartılmış, çıtır patates.",
          fiyat: 80,
          image: "images/atistirma-patates.jpg",
        },
      ],
      menuler: {
        baslik: "Menüler",
        urunler: [
          {
            ad: "Öğrenci Menü",
            aciklama: "1 döner, 1 ayran, 1 patates kızartması.",
            fiyat: null,
            image: "images/menu-ogrenci.jpg",
          },
          {
            ad: "Avantajlı Menü",
            aciklama: "1 tam döner, 4 soğan halkası, 2 nugget, 1 çıtır peynir, 1 patates kızartması.",
            fiyat: null,
            image: "images/menu-avantajli.jpg",
          },
          {
            ad: "Çocuk Menüsü",
            aciklama: "Yarım servis: 2 soğan halkası, 2 nugget, 1 çıtır peynir, yarım patates kızartması.",
            fiyat: null,
            image: "images/menu-cocuk.jpg",
          },
        ],
      },
    },
    {
      id: "icecekler",
      ad: "İçecekler",
      ikon: "🥤",
      renk: "#f6ca45",
      kapak: "images/kapak-icecek.jpg",
      urunler: [
        {
          ad: "Kola",
          aciklama: "Soğuk kutu kola, 330 ml.",
          fiyat: 25,
          image: "images/icecek-kola.jpg",
        },
        {
          ad: "Ayran",
          aciklama: "Ev yapımı, soğuk ayran.",
          fiyat: 20,
          image: "images/icecek-ayran.jpg",
        },
        {
          ad: "Su",
          aciklama: "Soğuk şişe su, 500 ml.",
          fiyat: 10,
          image: "images/icecek-su.jpg",
        },
        {
          ad: "Şalgam",
          aciklama: "Acılı, ekşi şalgam suyu.",
          fiyat: 25,
          image: "images/icecek-salgam.jpg",
        },
        {
          ad: "Meyve Suyu",
          aciklama: "Kutu meyve suyu, karışık meyveli.",
          fiyat: 30,
          image: "images/icecek-meyvesuyu.jpg",
        },
      ],
    },
  ],
};
