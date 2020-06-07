const Sequelize = require("sequelize");

const partidoModel = require("./models/partido");

const database = "fulbito";

// Setup database
const sequelize = new Sequelize(database, "fulbito", "fulbito", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

// Se crea la tabla partido
const Partido = partidoModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log(`Base de datos ${database} sincronizada`);
});

module.exports = { Partido };