const { Given, When, Then, After } = require("cucumber");
const axios = require("axios");
const assert = require("assert");

let equipos = [{ nombre: "equipo1" }, { nombre: "equipo2" }];
let partido = { fecha: "", hora: "", lugar: "" };
let dataResponse;

Given(
  "un usuario crea un partido con fecha {string} hora {string} y lugar {string}",
  function (fecha, hora, lugar) {
    partido = { fecha, hora, lugar, equipos };
  }
);

Given(
  "un usuario crea un partido con equipo1 {string} y equipo2 {string}",
  function (equipo1, equipo2) {
    let hora = "19:00";
    let fecha = "2020-12-01";
    let lugar = "Libertadores de América";
    equipos[0].nombre = equipo1;
    equipos[1].nombre = equipo2;
    partido = { fecha, hora, lugar, equipos };
  }
);

When("guarda la información", async function () {
  await axios
    .post("http://localhost:8081/partidos", partido)
    .then((response) => {
      dataResponse = response.data;
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Then(
  "el partido queda definido con equipo1 {string} y equipo2 {string}",
  async function (nombreEquipo1, nombreEquipo2) {
    assert.equal(dataResponse.equipos[0].nombre, nombreEquipo1);
    assert.equal(dataResponse.equipos[1].nombre, nombreEquipo2);
  }
);

Then("el partido no se crea por falta de nombres de equipo", function () {
  assert.equal(dataResponse.message, "Los equipos son obligatorios");
});

Then(
  "el partido queda definido con fecha {string} hora {string} y lugar {string}",
  function (fecha, hora, lugar) {
    assert.equal(dataResponse.fecha, fecha);
    assert.equal(dataResponse.hora, hora);
    assert.equal(dataResponse.lugar, lugar);
  }
);

Then("el partido no se crea por fecha inválida", function () {
  assert.equal(dataResponse.message, "La fecha es inválida");
});

Then("el partido no se crea por falta de fecha", function () {
  assert.equal(dataResponse.message, "La fecha es obligatoria");
});

Then("el partido no se crea por falta de hora", function () {
  assert.equal(dataResponse.message, "La hora es obligatoria");
});

Then("el partido no se crea por falta de lugar", function () {
  assert.equal(dataResponse.message, "El lugar es obligatorio");
});

// After(async function () {
//   await axios.delete("http://localhost:8081/partidos");
// });
