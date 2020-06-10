const { Given, When, Then } = require("cucumber");
const axios = require("axios");
const assert = require("assert");
const server = require("express-mock-server");
const mock = require("../../mock/mock");

let sources = [mock];

let serverConfig = {
  port: 8081
};

let serverMock = server.serverStart(sources, serverConfig);

let partido = { fecha: "", hora: "", lugar: "" };
let response;

Given(
  "un usuario crea un partido con fecha {string} hora {string} y lugar {string}",
  function (fecha, hora, lugar) {
    partido = { fecha, hora, lugar };
  }
);

When("guarda la información", async function () {
  response = await axios.post("http://127.0.0.1:8081/partidos", partido);
});

Then(
  "el partido queda definido con fecha {string} hora {string} y lugar {string}",
  function (fecha, hora, lugar) {
    assert.equal(response.data.fecha, fecha);
    assert.equal(response.data.hora, hora);
    assert.equal(response.data.lugar, lugar);

    serverMock.close();
  }
);


