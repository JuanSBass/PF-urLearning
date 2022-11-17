const admin = require("firebase-admin");
const { PRIVATE_KEY_ID_VALUE, PRIVATE_KEY_VALUE } = process.env;
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
