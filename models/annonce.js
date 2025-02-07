module.exports = (sequelize, datatype) => {
  const annonce = sequelize.define("annonce", {
    id: {
      type: datatype.UUID,
      defaultValue: datatype.UUIDV4,
      primaryKey: true,
    },
    pic: {
      type: datatype.STRING,
      allowNull: true,
      defaultValue: "anonymous",
    },
    url: {
      type: datatype.STRING,
      allowNull: true,
      defaultValue: `http://localhost:${process.env.port}/image/anonyme.jpg`,
    },
    titre: {
      type: datatype.STRING,
      allowNull: false,
    },
    contenu: {
      type: datatype.TEXT,
      allowNull: false,
    },
  });
  return annonce;
};
