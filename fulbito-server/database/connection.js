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

Usuario.belongsToMany(Equipo, { through: 'usuario_equipo', timestamps: false })
Equipo.belongsToMany(Usuario, { through: 'usuario_equipo', timestamps: false })

sequelize.sync({ force: false }).then(() => {
  console.log(`Base de datos ${database} sincronizada`);
}).then(async () => {
  await Usuario.create({nombre: "Lucas"});
  await Usuario.create({nombre: "Matias"});
  await Usuario.create({nombre: "Germán"});
  await Usuario.create({nombre: "Pedro"});
  await Usuario.create({nombre: "Pablo"});
  await Usuario.create({nombre: "Juan"});
  await Usuario.create({nombre: "Ezequiel"});
  await Usuario.create({nombre: "Cristian"});
  await Usuario.create({nombre: "Sebastian"});
  await Usuario.create({nombre: "Jose"});
})

module.exports = { Partido, Equipo, Usuario };
