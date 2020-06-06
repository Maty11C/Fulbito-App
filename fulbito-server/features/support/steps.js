const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");

Given("un partido sin fecha", function() {
  expect(this.getFecha()).to.eql(null);
})

When("le defino la fecha {string}", function(fecha) {
  this.setFecha(fecha);
})

Then("el partido tiene fecha {string}", function(fecha) {
  expect(this.getFecha()).to.eql(fecha);
})

Given("un partido sin hora", function() {
  expect(this.getHora()).to.eql(null);
})

When("le defino la hora {string}", function(hora) {
  this.setHora(hora);
})

Then("el partido tiene hora {string}", function(hora) {
  expect(this.getHora()).to.eql(hora);
})

Given("un partido sin lugar", function(){
  expect(this.getLugar()).to.eql(null);
})

When("le defino el lugar {string}", function(lugar) {
  this.setLugar(lugar);
})

Then("el partido tiene lugar {string}", function(lugar) {
  expect(this.getLugar()).to.eql(lugar);
})