const admin = require("../firebase/config.js");
class Middleware {
  async decodeToken(req, res, next) {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : "";
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        return next();
      }
      return res.json({ message: "can not authoize" });
    } catch (error) {
      return res.json({ message: "internall error" });
    }
  }
}

module.exports = new Middleware();