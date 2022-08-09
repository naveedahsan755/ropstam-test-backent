const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).json({ error: "Please sign in" });
  try {
    const user = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY
    );
    req.user = user;
    next();
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
};

module.exports = auth;
