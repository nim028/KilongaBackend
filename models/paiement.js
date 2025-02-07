module.exports = (sequelize, datatype) => {
  const paiement = sequelize.define("paiement", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    montant: {
      type: datatype.STRING,
      allowNull: false,
    },
    date: {
      type: datatype.DATE,
      allowNull: false,
    },
    type: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return paiement;
};
