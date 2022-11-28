const admin = require("../firebase/config.js");

class Middleware {
  async decodeToken(req, res, next) {
    try {
      console.log(req.headers, "mid 1");
      const token = req.headers.authorization.split(" ")[1];
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.body.userId = decodeValue.uid;
        return next();
      }
      return res.json({ message: "can not authoize" });
    } catch (error) {
      return res.status(401).send(error.message);
    }
  }
}

module.exports = new Middleware();
