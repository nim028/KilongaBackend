module.exports = (sequelize, datatype) => {
  const absence = sequelize.define("absence", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    dateAbsence: {
      type: datatype.DATE,
      allowNull: false,
    },
    motif: {
      type: datatype.TEXT,
      allowNull: false,
    },
  });
  return absence;
};
