const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ error: "Access forbidden, admin privileges required" });
  }
  next();
};

module.exports = isAdmin;
