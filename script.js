function formatFiyat(fiyat) {
  if (fiyat === null || fiyat === undefined) return null;
  return fiyat.toLocaleString("tr-TR") + " ₺";
}

function urunKarti(urun, ikonFallback) {
  const card = document.createElement("article");
  card.className = "card";

  const photo = document.createElement("div");
  photo.className = "photo";
  if (urun.image) {
    const img = document.createElement("img");
    img.src = urun.image;
    img.alt = urun.ad;
    photo.appendChild(img);
  } else {
    photo.textContent = ikonFallback;
  }
  card.appendChild(photo);

  const body = document.createElement("div");
  body.className = "body";

  const row = document.createElement("div");
  row.className = "row";
  const h3 = document.createElement("h3");
  h3.textContent = urun.ad;
  row.appendChild(h3);

  const fiyatMetni = formatFiyat(urun.fiyat);
  if (fiyatMetni) {
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = fiyatMetni;
    row.appendChild(price);
  }
  body.appendChild(row);

  const p = document.createElement("p");
  p.textContent = urun.aciklama;
  body.appendChild(p);

  card.appendChild(body);
  return card;
}

function renderHome() {
  document.querySelectorAll(".brand-accent").forEach((el) => {
    el.textContent = "Tostçu";
  });

  const wrap = document.getElementById("home-kategoriler");
  MENU.kategoriler.forEach((kategori) => {
    const btn = document.createElement("button");
    btn.className = "kategori-karti";
    btn.type = "button";
    btn.style.setProperty("--accent", kategori.renk || "#c2352f");
    const ikonIc = kategori.kapak
      ? `<img src="${kategori.kapak}" alt="${kategori.ad}" />`
      : kategori.ikon;
    const urunSayisi =
      kategori.urunler.length + (kategori.menuler ? kategori.menuler.urunler.length : 0);
    const altYazi = urunSayisi > 0 ? `${urunSayisi} ürün` : "Yakında";
    btn.innerHTML = `
      <span class="kategori-ikon">${ikonIc}</span>
      <span class="kategori-metin">
        <span class="kategori-ad">${kategori.ad}</span>
        <span class="kategori-sayi">${altYazi}</span>
      </span>
      <span class="kategori-ok" aria-hidden="true">›</span>
    `;
    btn.addEventListener("click", () => showCategory(kategori.id));
    wrap.appendChild(btn);
  });
}

function renderCategoryContent(kategori) {
  const content = document.getElementById("category-content");
  content.innerHTML = "";

  const toplamUrun =
    kategori.urunler.length + (kategori.menuler ? kategori.menuler.urunler.length : 0);

  if (toplamUrun === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `<span class="empty-icon">${kategori.ikon}</span><p>Bu bölüm çok yakında burada.</p>`;
    content.appendChild(empty);
    return;
  }

  if (kategori.menuler && kategori.menuler.urunler.length > 0) {
    const heading = document.createElement("h3");
    heading.className = "menuler-baslik";
    heading.textContent = kategori.menuler.baslik;
    content.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "grid";
    kategori.menuler.urunler.forEach((urun) => grid.appendChild(urunKarti(urun, kategori.ikon)));
    content.appendChild(grid);
  }

  if (kategori.urunler.length > 0) {
    const grid = document.createElement("div");
    grid.className = "grid";
    kategori.urunler.forEach((urun) => grid.appendChild(urunKarti(urun, kategori.ikon)));
    content.appendChild(grid);
  }
}

function showCategory(id) {
  const kategori = MENU.kategoriler.find((k) => k.id === id);
  if (!kategori) return;

  document.getElementById("category-title").textContent = `${kategori.ikon} ${kategori.ad}`;
  renderCategoryContent(kategori);

  const viewCategory = document.getElementById("view-category");
  viewCategory.style.setProperty("--accent", kategori.renk || "#c2352f");

  document.getElementById("view-home").classList.remove("active");
  viewCategory.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showHome() {
  document.getElementById("view-category").classList.remove("active");
  document.getElementById("view-home").classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderInfoFooter() {
  const el = document.getElementById("info-footer");
  const d = MENU.dukkan;
  const telHref = "tel:" + (d.telefon || "").replace(/[^+\d]/g, "");

  el.innerHTML = `
    <a class="info-satir" href="${telHref}">
      <span class="info-ikon">📞</span>
      <span>${d.telefon}</span>
    </a>
    <div class="info-satir">
      <span class="info-ikon">📍</span>
      <span>${d.adres}</span>
    </div>
    <div class="info-satir">
      <span class="info-ikon">🕒</span>
      <span>${d.saatler}</span>
    </div>
    <a class="info-satir" href="${d.instagramUrl}" target="_blank" rel="noopener">
      <span class="info-ikon">📷</span>
      <span>${d.instagram}</span>
    </a>
  `;
}

function renderRatingSection() {
  const yildizlar = document.querySelectorAll("#yildizlar .yildiz");
  const puanlaBtn = document.getElementById("puanla-btn");
  let secilenPuan = 0;

  yildizlar.forEach((yildiz) => {
    yildiz.addEventListener("click", () => {
      secilenPuan = Number(yildiz.dataset.puan);
      yildizlar.forEach((y) => {
        y.classList.toggle("dolu", Number(y.dataset.puan) <= secilenPuan);
      });
    });
  });

  puanlaBtn.addEventListener("click", () => {
    window.open(MENU.dukkan.googleMaps, "_blank", "noopener");
  });
}

function renderQrCode() {
  const el = document.getElementById("qrcode");
  if (typeof QRCode === "undefined") {
    el.textContent = "QR kod kütüphanesi yüklenemedi.";
    return;
  }
  new QRCode(el, {
    text: window.location.href,
    width: 120,
    height: 120,
    colorDark: "#0b0b0f",
    colorLight: "#ffffff",
  });
}

function baglaSayfaEtkilesimleri() {
  document.getElementById("back-btn").addEventListener("click", showHome);

  const yilEl = document.getElementById("copyright-yil");
  if (yilEl) yilEl.textContent = new Date().getFullYear();

  const shareBtn = document.getElementById("share-btn");
  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: MENU.dukkan.ad,
      text: `${MENU.dukkan.ad} — dijital menü`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // kullanıcı paylaşımı iptal etti, yapılacak bir şey yok
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      const eskiMetin = shareBtn.textContent;
      shareBtn.textContent = "Bağlantı kopyalandı ✓";
      setTimeout(() => {
        shareBtn.textContent = eskiMetin;
      }, 1800);
    }
  });
}

renderHome();
renderInfoFooter();
renderRatingSection();
renderQrCode();
baglaSayfaEtkilesimleri();
