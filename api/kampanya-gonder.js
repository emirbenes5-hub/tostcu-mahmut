const { Resend } = require("resend");
const { getSupabase } = require("./_lib/db");
const { adminYetkiliMi } = require("./_lib/admin-auth");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }
  if (!adminYetkiliMi(req)) {
    res.status(401).json({ error: "yetkisiz" });
    return;
  }

  const { konu, mesaj } = req.body || {};
  if (!konu || !mesaj) {
    res.status(400).json({ error: "konu ve mesaj gerekli" });
    return;
  }

  try {
    const supabase = getSupabase();
    const { data: aboneler, error } = await supabase.from("aboneler").select("email");
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    if (!aboneler || aboneler.length === 0) {
      res.status(200).json({ gonderilen: 0 });
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const gonderenAdres = process.env.RESEND_FROM || "Tostçu Mahmut <onboarding@resend.dev>";

    const { error: gonderimHatasi } = await resend.emails.send({
      from: gonderenAdres,
      to: aboneler.map((a) => a.email),
      subject: konu,
      text: mesaj,
    });

    if (gonderimHatasi) {
      res.status(500).json({ error: gonderimHatasi.message });
      return;
    }

    res.status(200).json({ gonderilen: aboneler.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
