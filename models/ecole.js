module.exports = (sequelize, datatype) => {
  const ecole = sequelize.define("ecole", {
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
    adresse: {
      type: datatype.STRING,
      allowNull: false,
    },
    ville: {
      type: datatype.STRING,
      allowNull: false,
    },
    codePostal: {
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
    siteWeb: {
      type: datatype.STRING,
      allowNull: false,
    },
    password: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return ecole;
};
