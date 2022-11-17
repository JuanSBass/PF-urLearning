const admin = require("firebase-admin");
const { PRIVATE_KEY_ID_VALUE, PRIVATE_KEY_VALUE } = process.env;
//const serviceAccount = require("./serviceAccount.json");

const serviceAccount = {
  type: "service_account",
  project_id: "urlearning-e9009",
  private_key_id: PRIVATE_KEY_ID_VALUE,
  private_key: PRIVATE_KEY_VALUE,
  client_email:
    "firebase-adminsdk-gpj27@urlearning-e9009.iam.gserviceaccount.com",
  client_id: "117871661699305708594",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gpj27%40urlearning-e9009.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
