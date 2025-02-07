module.exports = (sequelize, datatype) => {
  const plateforme = sequelize.define("plateforme", {
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
    coutAbonnement: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return plateforme;
};
