const dns = require("node:dns");
const { createClient } = require("@supabase/supabase-js");

// Node's fetch tries IPv6 first and, on networks/runtimes where that path is
// broken, fails outright instead of falling back to IPv4 — surfaces as a bare
// "TypeError: fetch failed" with no useful cause. Forcing IPv4 first is Node's
// own documented fix for this.
dns.setDefaultResultOrder("ipv4first");

let client;

function getSupabase() {
  if (!client) {
    client = createClient(
      (process.env.SUPABASE_URL || "").trim(),
      (process.env.SUPABASE_SERVICE_KEY || "").trim()
    );
  }
  return client;
}

module.exports = { getSupabase };
