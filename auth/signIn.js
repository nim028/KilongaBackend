const { compareSync } = require("bcrypt");
const { user } = require("../models");
const { sign } = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email == "") {
    return res.status(401).json({ message: "email vide" });
  }
  if (password == "") {
    return res.status(401).json({ message: "password vide" });
  }
  await user
    .findOne({ where: { email: email } })
    .then(async (u) => {
      if (!u) {
        return res.status(401).json({ message: "user n'existe pas" });
      }
      if (!compareSync(password, u.password)) {
        return res.status(401).json({ message: "password invalide" });
      }
      const payload = {
        id: u.id,
        pic: u.url,
        nom: u.nom,
        prenom: u.prenom,
        email: u.email,
        contact: u.contact,
        sexe: u.sexe,
        password: u.password,
        role: u.role,
      };
      const token = sign(payload, process.env.key, { expiresIn: "1d" });
      return res
        .status(201)
        .json({ message: "user login success", token: "bearer " + token });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = { login };
