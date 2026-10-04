module.exports = async (req, res) => {
  const url = (process.env.SUPABASE_URL || "").trim();
  const key = (process.env.SUPABASE_SERVICE_KEY || "").trim();

  const info = {
    supabaseUrlLength: url.length,
    supabaseUrlStartsHttps: url.startsWith("https://"),
    supabaseUrlHasSupabaseCo: url.includes(".supabase.co"),
    supabaseUrlHasWhitespace: /\s/.test(url),
    supabaseKeyLength: key.length,
    supabaseKeyHasWhitespace: /\s/.test(key),
    supabaseKeyLooksLikeJwt: key.startsWith("eyJ"),
    supabaseKeyLooksLikeNewFormat: key.startsWith("sb_secret_"),
  };

  try {
    const r = await fetch(url + "/rest/v1/", {
      headers: { apikey: key, Authorization: "Bearer " + key },
    });
    info.rawFetchStatus = r.status;
    info.rawFetchOk = r.ok;
  } catch (err) {
    info.rawFetchError = String(err);
    info.rawFetchErrorCause = err.cause ? String(err.cause) : null;
  }

  try {
    const r2 = await fetch("https://example.com");
    info.exampleComStatus = r2.status;
  } catch (err) {
    info.exampleComError = String(err);
    info.exampleComErrorCause = err.cause ? String(err.cause) : null;
  }

  res.status(200).json(info);
};
