module.exports = (sequelize, datatype) => {
  const enseignant = sequelize.define("enseignant", {
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
    nom: {
      type: datatype.STRING,
      allowNull: false,
    },
    prenom: {
      type: datatype.STRING,
      allowNull: false,
    },
    telephone: {
      type: datatype.STRING,
      allowNull: false,
    },
    email: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return enseignant;
};
