module.exports = (sequelize, datatype) => {
  const classe = sequelize.define("classe", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    nom: {
      type: datatype.STRING,
      allowNull: false,
    },
    anneeScolaire: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return classe;
};
