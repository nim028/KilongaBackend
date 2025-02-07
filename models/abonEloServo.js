module.exports = (sequelize, datatype) => {
  const abonEloServo = sequelize.define("abonEloServo", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    debut: {
      type: datatype.DATE,
      allowNull: false,
    },
    fin: {
      type: datatype.DATE,
      allowNull: false,
    },
    type: {
      type: datatype.STRING,
      allowNull: false,
    },
    status: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return abonEloServo;
};
