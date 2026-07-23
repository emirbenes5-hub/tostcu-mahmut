function adminYetkiliMi(req) {
  const sifre = req.headers["x-admin-sifre"];
  return Boolean(sifre) && sifre === process.env.ADMIN_SIFRE;
}

module.exports = { adminYetkiliMi };
