module.exports = (sequelize, datatype) => {
  const service = sequelize.define("service", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    nom: {
      type: datatype.STRING,
      allowNull: false,
    },
    description: {
      type: datatype.TEXT,
      allowNull: false,
    },
    cout: {
      type: datatype.DATE,
      allowNull: false,
    },
  });
  return service;
};
