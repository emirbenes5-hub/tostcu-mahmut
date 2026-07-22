function formatFiyat(fiyat) {
  if (fiyat === null || fiyat === undefined) return null;
  return fiyat.toLocaleString("tr-TR") + " ₺";
}

function urunKarti(urun, ikonFallback) {
  const card = document.createElement("article");
  card.className = "card";

  const media = document.createElement("div");
  media.className = "card-media";

  if (urun.image) {
    const img = document.createElement("img");
    img.className = "card-img";
    img.src = urun.image;
    img.alt = urun.ad;
    img.loading = "lazy";
    media.appendChild(img);
  } else {
    media.classList.add("card-media--fallback");
    const fallbackIcon = document.createElement("span");
    fallbackIcon.className = "card-fallback-icon";
    fallbackIcon.textContent = ikonFallback;
    media.appendChild(fallbackIcon);
  }

  const overlay = document.createElement("div");
  overlay.className = "card-overlay";

  const h3 = document.createElement("h3");
  h3.className = "card-ad";
  h3.textContent = urun.ad;
  overlay.appendChild(h3);

  const fiyatMetni = formatFiyat(urun.fiyat);
  if (fiyatMetni) {
    const price = document.createElement("span");
    price.className = "card-fiyat";
    price.textContent = fiyatMetni;
    overlay.appendChild(price);
  }

  media.appendChild(overlay);
  card.appendChild(media);

  if (urun.aciklama) {
    const p = document.createElement("p");
    p.className = "card-aciklama";
    p.textContent = urun.aciklama;
    card.appendChild(p);
  }

  return card;
}

function renderHome() {
  document.querySelectorAll(".brand-accent").forEach((el) => {
    el.textContent = "Tostçu";
  });

  const wrap = document.getElementById("home-kategoriler");
  MENU.kategoriler.forEach((kategori) => {
    const btn = document.createElement("button");
    btn.className = "kategori-tab";
    btn.type = "button";
    btn.style.setProperty("--accent", kategori.renk || "#c2352f");

    const urunSayisi =
      kategori.urunler.length + (kategori.menuler ? kategori.menuler.urunler.length : 0);
    if (urunSayisi === 0) {
      btn.classList.add("kategori-tab--soon");
    }

    const ikonIc = kategori.kapak
      ? `<img src="${kategori.kapak}" alt="" />`
      : kategori.ikon;

    btn.innerHTML = `
      <span class="kategori-tab-ikon">${ikonIc}</span>
      <span class="kategori-tab-ad">${kategori.ad}</span>
      ${urunSayisi === 0 ? '<span class="kategori-tab-alt">Yakında</span>' : ""}
    `;
    btn.setAttribute(
      "aria-label",
      urunSayisi > 0 ? `${kategori.ad}, ${urunSayisi} ürün` : `${kategori.ad}, yakında`
    );
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

function initSplash() {
  const splash = document.getElementById("splash");
  if (!splash) return;

  document.body.classList.add("splash-active");

  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    splash.classList.add("splash-hide");
    document.body.classList.remove("splash-active");
    setTimeout(() => splash.remove(), 550);
  };

  const MIN_DELAY = 700;
  const MAX_DELAY = 1400;

  if (document.readyState === "complete") {
    setTimeout(hide, MIN_DELAY);
  } else {
    window.addEventListener("load", () => setTimeout(hide, MIN_DELAY), { once: true });
  }
  setTimeout(hide, MAX_DELAY);
}

initSplash();
renderHome();
renderInfoFooter();
renderRatingSection();
renderQrCode();
baglaSayfaEtkilesimleri();
