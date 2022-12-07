const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log("%s listening at", PORT); // eslint-disable-line no-console
  });
});
