const Sequelize = require("sequelize");

const partidoModel = require("./models/partido");
const equipoModel = require("./models/equipo");

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
// Se crea la tabla equipo
const Equipo = equipoModel(sequelize, Sequelize);

Equipo.hasMany(Partido, {
  foreignKey: "equipo1_id",
  allowNull: false,
  constraints: false
});

Equipo.hasMany(Partido, {
  foreignKey: "equipo2_id",
  allowNull: false,
  constraints: false
});

sequelize.sync({ force: true }).then(() => {
  console.log(`Base de datos ${database} sincronizada`);
});

module.exports = { Partido, Equipo };
