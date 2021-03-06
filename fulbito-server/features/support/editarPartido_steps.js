const { Given, When, Then, After } = require("cucumber");
const axios = require("axios");
const assert = require("assert");

const { Usuario, Equipo, Partido } = require("../../database/connection");

let equipos = [{ nombre: "Los bosteros" }, { nombre: "Las gallinas" }];
let partido = { fecha: "", hora: "", lugar: "" };
let dataResponse;
let idPartido;

Given("un partido ya creado con fecha {string}", async function (fecha) {
  let hora = "19:00";
  let lugar = "Libertadores de América";
  partido = { fecha, hora, lugar, equipos };
  await axios
    .post("http://localhost:8081/partidos", partido)
    .then((response) => (dataResponse = response.data));
});

When("edito la fecha del partido por {string}", async function (fecha) {
  idPartido = dataResponse.id;
  partido = { fecha };
  await axios
    .put(`http://localhost:8081/partidos/${idPartido}`, partido)
    .then((response) => {
      dataResponse = response.data;
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Then("la fecha del partido esta actualizada al {string}", async function (
  fecha
) {
  let partidoActualizado;
  await axios
    .get(`http://localhost:8081/partidos/${idPartido}`)
    .then((response) => {
      partidoActualizado = response.data;
    });
  assert.equal(dataResponse.message, "El partido se actualizó exitosamente");
  assert.equal(partidoActualizado.fecha, fecha);
});

Given("un partido ya creado con hora {string}", async function (hora) {
  let fecha = "2020-12-01";
  let lugar = "Libertadores de América";
  partido = { fecha, hora, lugar, equipos };
  await axios
    .post("http://localhost:8081/partidos", partido)
    .then((response) => (dataResponse = response.data));
});

When("edito la hora del partido por {string}", async function (hora) {
  idPartido = dataResponse.id;
  partido = { hora };
  await axios
    .put(`http://localhost:8081/partidos/${idPartido}`, partido)
    .then((response) => {
      dataResponse = response.data;
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Then("la hora del partido está actualizada a {string}", async function (hora) {
  let partidoActualizado;
  await axios
    .get(`http://localhost:8081/partidos/${idPartido}`)
    .then((response) => {
      partidoActualizado = response.data;
    });
  assert.equal(dataResponse.message, "El partido se actualizó exitosamente");
  assert.equal(partidoActualizado.hora, hora);
});

Given("un partido ya creado con ubicación {string}", async function (lugar) {
  let hora = "19:00";
  let fecha = "2020-12-01";
  partido = { fecha, hora, lugar, equipos };
  await axios
    .post("http://localhost:8081/partidos", partido)
    .then((response) => (dataResponse = response.data));
});

When("edito la ubicación del partido por {string}", async function (lugar) {
  idPartido = dataResponse.id;
  partido = { lugar };
  await axios
    .put(`http://localhost:8081/partidos/${idPartido}`, partido)
    .then((response) => {
      dataResponse = response.data;
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Then("la ubicación del partido está actualizada a {string}", async function (
  lugar
) {
  let partidoActualizado;
  await axios
    .get(`http://localhost:8081/partidos/${idPartido}`)
    .then((response) => {
      partidoActualizado = response.data;
    });
  assert.equal(dataResponse.message, "El partido se actualizó exitosamente");
  assert.equal(partidoActualizado.lugar, lugar);
});

Then("el partido no se edita por fecha inválida", function () {
  assert.equal(dataResponse.message, "La fecha es inválida");
});

When("edito el partido y no ingreso un campo", async function () {
  idPartido = dataResponse.id;
  partido = {};
  await axios
    .put(`http://localhost:8081/partidos/${idPartido}`, partido)
    .then((response) => {
      dataResponse = response.data;
    })
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Then("el partido no se edita por falta de campos", function () {
  assert.equal(
    dataResponse.message,
    "Se debe ingresar al menos un campo para actualizar"
  );
});

Given(
  "un partido ya creado con el equipo con nombre {string} y el equipo con nombre {string}",
  async function (nombreEquipo1, nombreEquipo2) {
    let hora = "19:00";
    let lugar = "Libertadores de América";
    let fecha = "2020-12-01";
    let equipos = [];  
    equipo1 = {nombre: nombreEquipo1};
    equipo2 = {nombre: nombreEquipo2};
    equipos.push(equipo1);
    equipos.push(equipo2);
    equipos[1].nombre = nombreEquipo2;
    partido = { fecha, hora, lugar, equipos };
    await axios
      .post("http://localhost:8081/partidos", partido)
      .then((response) => (dataResponse = response.data))
  }
);

When(
  "edito el nombre de equipo por {string} y el otro equipo {string}",
  async function (nombreEquipo1, nombreEquipo2) {
    idPartido = dataResponse.id;
    equipos[0].nombre = nombreEquipo1;
    equipos[1].nombre = nombreEquipo2;
    equipos[0].id = dataResponse.equipos[0].id;
    equipos[1].id = dataResponse.equipos[1].id;
    partido = { equipos };
    await axios
      .put(`http://localhost:8081/partidos/${idPartido}`, partido)
      .then((response) => {

      })
      .catch((error) => {
        dataResponse = error.response.data;
      });
  }
);

When("edito el nombre de algun equipo por {string}", async function (
  nombreEquipo
) {
  idPartido = dataResponse.id;
  equipos[0].nombre = nombreEquipo;
  equipos[0].id = dataResponse.equipos[0].id;
  equipos[1].id = dataResponse.equipos[1].id;
  partido = { equipos };
  await axios
    .put(`http://localhost:8081/partidos/${idPartido}`, partido)
    .then(() => {})
    .catch((error) => {
      dataResponse = error.response.data;
    });
});

Then(
  "el nombre del primer equipo cambia a {string} y el segundo cambia a {string}",
  async function (nombreEquipo1, nombreEquipo2) {
    await axios
      .get(`http://localhost:8081/partidos/${idPartido}`)
      .then((response) => {
        dataResponse = response.data;
      });
    assert.equal(dataResponse.equipos[0].nombre, nombreEquipo1);
    assert.equal(dataResponse.equipos[1].nombre, nombreEquipo2);
  }
);

Then(
  "el nombre del primer equipo es {string} y del segundo {string}",
  async function (nombreEquipo1, nombreEquipo2) {
    await axios
      .get(`http://localhost:8081/partidos/${idPartido}`)
      .then((response) => {
        dataResponse = response.data;
      });
    assert.equal(dataResponse.equipos[0].nombre, nombreEquipo1);
    assert.equal(dataResponse.equipos[1].nombre, nombreEquipo2);
  }
);

After(async function () {
 Usuario.destroy({ where: {}});
 Equipo.destroy({ where: {}});
 Partido.destroy({ where: {}});
});