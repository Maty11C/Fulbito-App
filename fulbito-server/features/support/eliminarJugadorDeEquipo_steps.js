const { Given, When, Then, Before, After } = require("cucumber");
const axios = require("axios");
const assert = require("assert");

const { Usuario, Equipo, Partido } = require("../../database/connection");

let equipos = [{ nombre: "" }, { nombre: "" }];
let partido = { fecha: "", hora: "", lugar: "", equipos: [] };
let dataResponse;
let partidoCreado;
let usuarioAEliminar;

Before(async function () {
    let hora = "19:00";
    let fecha = "2020-12-01";
    let lugar = "Libertadores de América";
    equipos[0].nombre = "Casados";
    equipos[1].nombre = "Solteros";
    partido = { fecha, hora, lugar, equipos };
  
    partidoCreado = await axios.post("http://localhost:8081/partidos", partido);
  });

Given("un equipo con usuarios participantes", async function () {
    let equipo = await Equipo.findOne({where:{id: partidoCreado.data.equipos[0].id}});

    usuarioAEliminar = await Usuario.create({ nombre: "pepito" });
    usuarioEnEquipo1 = await Usuario.create({ nombre: "pepito" });
    usuarioEnEquipo2 = await Usuario.create({ nombre: "pepito" });
    usuarioEnEquipo3 = await Usuario.create({ nombre: "pepito" });

    await equipo.addUsuario(usuarioAEliminar);
    await equipo.addUsuario(usuarioEnEquipo1);
    await equipo.addUsuario(usuarioEnEquipo2);
    await equipo.addUsuario(usuarioEnEquipo3);
});

Given("un equipo en el que no participa el usuario", async function () {
   let equipo = await Equipo.findOne({where:{id: partidoCreado.data.equipos[0].id}});

   usuarioAEliminar = await Usuario.create({ nombre: "pepito" });
   usuarioEnEquipo1 = await Usuario.create({ nombre: "pepito" });
   usuarioEnEquipo2 = await Usuario.create({ nombre: "pepito" });
   usuarioEnEquipo3 = await Usuario.create({ nombre: "pepito" });

   await equipo.addUsuario(usuarioEnEquipo1);
   await equipo.addUsuario(usuarioEnEquipo2);
   await equipo.addUsuario(usuarioEnEquipo3);
});

When("selecciono un usuario para eliminarlo del equipo del partido", async function () {
    await axios
        .delete(
            `http://localhost:8081/equipos/${partidoCreado.data.equipos[0].id}/${usuarioAEliminar.dataValues.id}`,
        )
        .then((response) => {
            dataResponse = response.data;
        })
        .catch((error) => {
            dataResponse = error.response.data;
        });
});

Then("el usuario ya no forma parte del equipo", async function () {
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
          (usuario) => usuario.id === usuarioAEliminar.dataValues.id
        ),
        false
      );
});

Then("no puedo eliminarlo debido a que no pertenece al equipo", function () {
   assert.equal(dataResponse.message, "El jugador no pertenece al equipo")
})

After(async function () {
   Usuario.destroy({ where: {}});
   Equipo.destroy({ where: {}});
   Partido.destroy({ where: {}});
 });