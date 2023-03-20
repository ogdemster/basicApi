import jwt from "jsonwebtoken";

function verify(req, res, next) {
  const token = req.headers["auth-token"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
}

export default verify;
