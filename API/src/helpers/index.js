const admin = require("../firebase/config");

const decodeInfo = async (token) => {
  const decodeValue = await admin.auth().verifyIdToken(token);
  if (!decodeValue) return new Error("no se pudio");
  const userId = decodeValue.uid;
  return userId;
};

module.exports = {
  decodeInfo,
};
