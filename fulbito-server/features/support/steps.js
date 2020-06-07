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
    .then(function(res) {
      return res;
    })
    .catch(function(res) {  
        return res;
    });
})

Then('el partido queda definido con fecha {string} hora {string} y lugar {string}', function(fecha, hora, lugar) {
  assert.equal(partido.fecha, response.data.fecha)
  assert.equal(partido.hora, response.data.hora)
  assert.equal(partido.lugar, response.data.lugar)
})