const Sequelize = require("sequelize");

const partidoModel = require("./models/partido");
const equipoModel = require("./models/equipo");
const usuarioModel = require("./models/usuario");

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
// Se crea la tabla usuario
const Usuario = usuarioModel(sequelize, Sequelize);

//Relaciones
Partido.hasMany(Equipo);

Usuario.belongsToMany(Equipo, { through: 'jugadores' })
Equipo.belongsToMany(Usuario, { through: 'jugadores' })

sequelize.sync({ force: false }).then(() => {
  console.log(`Base de datos ${database} sincronizada`);
});

module.exports = { Partido, Equipo, Usuario };
