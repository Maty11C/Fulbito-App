module.exports = (sequelize, type) => {
  return sequelize.define(
    "partido",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: type.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: type.TIME,
        allowNull: false,
      },
      lugar: {
        type: type.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
