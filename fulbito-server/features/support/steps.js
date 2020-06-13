const { Given, When, Then } = require("cucumber");
const axios = require("axios");
const assert = require("assert");

let partido = { fecha: "", hora: "", lugar: "" };
let dataResponse;
let idPartido;

Given(
  "un usuario crea un partido con fecha {string} hora {string} y lugar {string}",
  function (fecha, hora, lugar) {
    partido = { fecha, hora, lugar };
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

Then("el partido no se crea", function () {
  assert.equal(dataResponse.message, "No se pudo crear el partido");
});

Given(
  "un usuario crea un partido con hora {string} y lugar {string}",
  function (hora, lugar) {
    partido = { hora, lugar };
  }
);

Given(
  "un usuario crea un partido con fecha {string} y lugar {string}",
  function (fecha, lugar) {
    partido = { fecha, lugar };
  }
);

Given(
  "un usuario crea un partido con fecha {string} y hora {string}",
  function (fecha, hora) {
    partido = { fecha, hora };
  }
);

Given("un partido ya creado con fecha {string}", async function (fecha) {
  let hora = "19:00";
  let lugar = "Libertadores de América";
  partido = { fecha, hora, lugar };
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
  assert.equal(partidoActualizado[0].fecha, fecha);
});

Given("un partido ya creado con hora {string}", async function (hora) {
  let fecha = "2020-12-01";
  let lugar = "Libertadores de América";
  partido = { fecha, hora, lugar };
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

Then("la hora del partido está actualizada a {string}", async function (
  hora
) {
  let partidoActualizado;
  await axios
    .get(`http://localhost:8081/partidos/${idPartido}`)
    .then((response) => {
      partidoActualizado = response.data;
    });
  assert.equal(dataResponse.message, "El partido se actualizó exitosamente");
  assert.equal(partidoActualizado[0].hora, hora);
});

Given("un partido ya creado con ubicación {string}", async function (lugar) {
  let hora = "19:00";
  let fecha = "2020-12-01";
  partido = { fecha, hora, lugar };
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
  assert.equal(partidoActualizado[0].lugar, lugar);
});

Then("el partido no se edita por fecha inválida", function () {
  assert.equal(dataResponse.message, "La fecha es inválida");
});