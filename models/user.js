module.exports = (sequelize, datatype) => {
  const user = sequelize.define("user", {
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
    email: {
      type: datatype.STRING,
      allowNull: false,
    },
    sexe: {
      type: datatype.STRING,
      allowNull: true,
    },
    password: {
      type: datatype.STRING,
      allowNull: false,
    },
    role: {
      type: datatype.STRING,
      allowNull: false,
    },
  });
  return user;
};
