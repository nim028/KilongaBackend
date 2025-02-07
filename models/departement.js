module.exports = (sequelize, datatype) => {
  const departement = sequelize.define("departement", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    nom: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return departement;
};
