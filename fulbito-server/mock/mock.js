module.exports = [
  {
    request: {
      method: "POST",
      path: "/partidos",
    },
    response: {
      statusCode: 200,
      body: JSON.stringify({
        fecha: "2020-06-16",
        hora: "19:00:00",
        lugar: "Libertadores de América",
      }),
    },
  },
];
