const { getSupabase } = require("./_lib/db");
const { adminYetkiliMi } = require("./_lib/admin-auth");

module.exports = async (req, res) => {
  if (!adminYetkiliMi(req)) {
    res.status(401).json({ error: "yetkisiz" });
    return;
  }

  const supabase = getSupabase();

  const [ziyaretRes, etkilesimRes, aboneRes] = await Promise.all([
    supabase.from("ziyaretler").select("created_at"),
    supabase.from("etkilesimler").select("tur, kategori_id, urun_adi"),
    supabase.from("aboneler").select("email, created_at").order("created_at", { ascending: false }),
  ]);

  if (ziyaretRes.error || etkilesimRes.error || aboneRes.error) {
    res.status(500).json({
      error: (ziyaretRes.error || etkilesimRes.error || aboneRes.error).message,
    });
    return;
  }

  const aylikSayim = {};
  ziyaretRes.data.forEach((z) => {
    const ay = z.created_at.slice(0, 7);
    aylikSayim[ay] = (aylikSayim[ay] || 0) + 1;
  });

  const kategoriSayim = {};
  const urunSayim = {};
  etkilesimRes.data.forEach((e) => {
    if (e.tur === "kategori" && e.kategori_id) {
      kategoriSayim[e.kategori_id] = (kategoriSayim[e.kategori_id] || 0) + 1;
    }
    if (e.tur === "urun" && e.urun_adi) {
      urunSayim[e.urun_adi] = (urunSayim[e.urun_adi] || 0) + 1;
    }
  });

  const siraliKategori = Object.entries(kategoriSayim).sort((a, b) => b[1] - a[1]);
  const siraliUrun = Object.entries(urunSayim).sort((a, b) => b[1] - a[1]);

  res.status(200).json({
    toplamZiyaret: ziyaretRes.data.length,
    aylikSayim,
    siraliKategori,
    siraliUrun,
    aboneSayisi: aboneRes.data.length,
    aboneler: aboneRes.data,
  });
};
