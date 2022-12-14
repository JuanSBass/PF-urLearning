require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: PGDATABASE,
        dialect: "postgres",
        host: PGHOST,
        port: PGPORT,
        username: PGUSER,
        password: PGPASSWORD,
        pool: {
          max: 3,
          min: 1,
          acquire: 30000,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
        { logging: false, native: false }
      );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Course,
  Category,
  SubCategory,
  Cart,
  Order,
  FavouriteList,
  ProfessorRole,
  ContactUs,
  Comments,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Category.hasMany(SubCategory, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
SubCategory.belongsTo(Category);

User.hasMany(Cart);
Cart.belongsTo(User);

// User.hasMany(ContactUs);
// ContactUs.belongsTo(User);

// Relacion user-order-MP
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Course, { through: "orderCourse" });
Course.belongsToMany(Order, { through: "orderCourse" });

User.belongsToMany(Course, { through: "userCourse" });
Course.belongsToMany(User, { through: "userCourse" });

User.hasOne(FavouriteList);
FavouriteList.belongsTo(User);

FavouriteList.belongsToMany(Course, { through: "favouriteListCourse" });
Course.belongsToMany(FavouriteList, { through: "favouriteListCourse" });

User.hasOne(ProfessorRole);
ProfessorRole.belongsTo(User);

ProfessorRole.hasMany(Course);
Course.belongsTo(ProfessorRole);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
