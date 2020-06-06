module.exports = (sequelize, type) => {
  return sequelize.define(
    "partido",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: type.DATEONLY,
      hora: type.TIME,
      lugar: type.STRING,
    },
    { timestamps: false }
  );
};
