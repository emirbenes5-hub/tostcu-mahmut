const { OAuth2Client } = require("google-auth-library");
const { getSupabase } = require("./_lib/db");

const oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const { credential } = req.body || {};
  if (!credential) {
    res.status(400).json({ error: "credential eksik" });
    return;
  }

  let payload;
  try {
    const ticket = await oauthClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (err) {
    res.status(401).json({ error: "gecersiz token" });
    return;
  }

  if (!payload || !payload.email) {
    res.status(401).json({ error: "mail bilgisi alinamadi" });
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("aboneler")
      .upsert({ email: payload.email, google_sub: payload.sub }, { onConflict: "google_sub" });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
