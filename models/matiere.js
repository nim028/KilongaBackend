module.exports = (sequelize, datatype) => {
  const matiere = sequelize.define("matiere", {
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
  return matiere;
};
