const { getSupabase } = require("./_lib/db");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("ziyaretler").insert({});

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(204).end();
};
