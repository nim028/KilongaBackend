module.exports = (sequelize, datatype) => {
  const planning = sequelize.define("planning", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    jour: {
      type: datatype.STRING,
      allowNull: false,
    },
    debut: {
      type: datatype.STRING,
      allowNull: false,
    },
    fin: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return planning;
};
