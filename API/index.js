const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
