module.exports = (sequelize, type) => {
  return sequelize.define(
    "equipo",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: type.STRING,
        allowNull: false,
      }
    },
    { timestamps: false }
  );
};
