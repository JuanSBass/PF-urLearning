const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  //cambie el force a false para que se guarden los temperaments asi cuando creo un
  //perro tiene donde buscar los temperaments para asignarselos. esto fue un error que
  //me llevo bastante tiempo arreglar.
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
