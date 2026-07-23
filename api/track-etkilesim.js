const { getSupabase } = require("./_lib/db");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const { tur, kategori_id, urun_adi } = req.body || {};
  if (tur !== "kategori" && tur !== "urun") {
    res.status(400).json({ error: "gecersiz tur" });
    return;
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("etkilesimler").insert({
    tur,
    kategori_id: kategori_id || null,
    urun_adi: urun_adi || null,
  });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(204).end();
};
