const { hashSync } = require("bcrypt");
const { user} = require("../models");

const register = async (req, res) => {
  const { nom, prenom, email, password,role, confirme } = req.body;
  if (nom == "") {
    return res.status(401).json({ message: "nom vide" });
  }
  if (prenom == "") {
    return res.status(401).json({ message: "prenom vide" });
  }
  if (email == "") {
    return res.status(401).json({ message: "email vide" });
  }
  if (password == "") {
    return res.status(401).json({ message: "password vide" });
  }
  if (confirme == "") {
    return res.status(401).json({ message: "confirme vide" });
  }
  if (password != confirme) {
    return res.status(401).json({ message: "mot de passe invalide" });
  }
  await user
    .findOne({ where: { email: email } })
    .then(async (y) => {
      if (!y) {
        await user
          .build({
            nom,
            prenom,
            email,
            password: hashSync(password, 10),
            role,
          })
          .save();
        return res.status(201).json({ message: "user créer success" });
      }
      res.status(401).json({ message: "user existe déja" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
module.exports = { register};
