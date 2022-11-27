class Middleware {
  async decodeToken(req, res, next) {
    let token;
    try {
      req.body.headers.authorization
        ? (token = req.body.headers.authorization.split(" ")[1])
        : (token = req.headers.authorization.split(" ")[1]);
      const decodeValue = await admin.auth().verifyIdToken(token);
      console.log(decodeValue, "soy el decodeValue, toy mid");
      if (decodeValue) {
        req.body.headers.authorization
          ? (req.body.userId = decodeValue.uid)
          : (req.headers.userId = decodeValue.uid);
        return next();
      }
      return res.json({ message: "can not authoize" });
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
}
