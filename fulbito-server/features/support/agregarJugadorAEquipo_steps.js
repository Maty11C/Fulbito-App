const { Given, When, Then, Before, After } = require("cucumber");
const axios = require("axios");
const assert = require("assert");

const { Usuario } = require("../../database/connection");

let equipos = [{ nombre: "" }, { nombre: "" }];
let partido = { fecha: "", hora: "", lugar: "", equipos: [] };

let idEquipo;
let idUsuario;

let idUsuarioCreado;

let dataResponse;

Before(async function () {
    let hora = "19:00";
    let fecha = "2020-12-01";
    let lugar = "Libertadores de América";
    equipos[0].nombre = "Casados";
    equipos[1].nombre = "Solteros";
    partido = { fecha, hora, lugar, equipos };

    await axios
    .post("http://localhost:8081/partidos", partido)
    .then((response) => {
      idEquipo = response.data.equipos[0].id;
      console.log(idEquipo)
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Given(
    "el usuario con id {int} registrado en el sistema",
    function (idUsuario) {  
        const usuario = { nombre: 'pepito' }
        Usuario.create(usuario)
            .then((data) => {
              idUsuarioCreado = data.dataValues.id
              console.log(idUsuarioCreado)
            })
            .catch(() => {
              
            });
    }
  );
  
When("lo agrego al equipo con id {int}", async function (idEquipo) {
  const jugador = { idUsuario }
  await axios
    .post(`http://localhost:8081/equipos/${idEquipo}`, jugador)
    .then((response) => {
      dataResponse = response.data;
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Then(
  "el usuario con id {int} forma parte del equipo con id {int}",
  async function (idUsuario, idEquipo) {
    
  }
);