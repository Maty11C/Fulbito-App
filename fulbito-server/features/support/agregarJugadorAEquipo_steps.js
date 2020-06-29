const { Given, When, Then, Before, After } = require("cucumber");
const axios = require("axios");
const assert = require("assert");

const { Usuario } = require("../../database/connection");

let equipos = [{ nombre: "" }, { nombre: "" }];
let partido = { fecha: "", hora: "", lugar: "", equipos: [] };
let dataResponse;
let partidoCreado;
let usuarioCreado;

Before(async function () {
  let hora = "19:00";
  let fecha = "2020-12-01";
  let lugar = "Libertadores de América";
  equipos[0].nombre = "Casados";
  equipos[1].nombre = "Solteros";
  partido = { fecha, hora, lugar, equipos };

  partidoCreado = await axios.post("http://localhost:8081/partidos", partido);
});

Given("un usuario registrado en el sistema", async function () {
  usuarioCreado = await Usuario.create({ nombre: "pepito" });
});

When("lo agrego al equipo", async function () {
  const body = { idUsuario: usuarioCreado.dataValues.id };
  await axios
    .post(
      `http://localhost:8081/equipos/${partidoCreado.data.equipos[0].id}`,
      body
    )
    .then((response) => {
      dataResponse = response.data;
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

When("lo agrego a un equipo y quiero agregarlo al otro", async function () {
  const body = { idUsuario: usuarioCreado.dataValues.id };
  await axios
    .post(
      `http://localhost:8081/equipos/${partidoCreado.data.equipos[0].id}`,
      body
    );
  
  await axios
    .post(
      `http://localhost:8081/equipos/${partidoCreado.data.equipos[1].id}`,
      body
    )
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Then("el usuario forma parte del equipo", async function () {
  await axios
    .get(`http://localhost:8081/equipos/${partidoCreado.data.equipos[0].id}`)
    .then((response) => {
      dataResponse = response.data;
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });

  assert.equal(
    dataResponse.usuarios.some(
      (usuario) => usuario.id === usuarioCreado.dataValues.id
    ),
    true
  );
});

Then("el usuario no se agrega dos veces", function() {
  assert.equal(dataResponse.message,"El equipo no puede pertenecer a los dos equipos")
})
