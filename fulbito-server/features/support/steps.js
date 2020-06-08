const { Given, When, Then } = require("cucumber");
const axios = require('axios');
const assert = require('assert');

let partido = { fecha: '', hora: '', lugar: '' };
let response;

Given('un usuario crea un partido con fecha {string} hora {string} y lugar {string}', function(fecha, hora, lugar) {
  partido = { fecha, hora, lugar }
})

When('guarda la información', async function() {
  response = await axios.post("http://localhost:8081/partidos", partido)
})

Then('el partido queda definido con fecha {string} hora {string} y lugar {string}', function(fecha, hora, lugar) {
  assert.equal(response.data.fecha, fecha)
  assert.equal(response.data.hora, hora)
  assert.equal(response.data.lugar, lugar)
})