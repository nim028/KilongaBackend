module.exports = (sequelize, datatype) => {
  const note = sequelize.define("note", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    noti: {
      type: datatype.INTEGER,
      allowNull: false,
    },
    date: {
      type: datatype.DATE,
      allowNull: false,
    },
  });
  return note;
};
