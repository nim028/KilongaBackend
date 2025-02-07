const path = require("path");
const { unlinkSync } = require("fs");
const { hashSync } = require("bcrypt");
const {
  ecole,
  plateforme,
  user,
  eleve,
  enseignant,
  classe,
  matiere,
  departement,
  planning,
  note,
  absence,
  service,
  abonEcoPlato,
  abonEloServo,
  paiement,
  annonce,
} = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    contact,
    sexe,
    password,
    confirme,
    plateformeId,
  } = req.body;
  // if (nom == "") {
  //   return res.status(200).json({ message: "nom vide" });
  // }
  // if (prenom == "") {
  //   return res.status(200).json({ message: "prenom vide" });
  // }
  // if (email == "") {
  //   return res.status(200).json({ message: "email vide" });
  // }
  // if (contact == "") {
  //   return res.status(200).json({ message: "contact vide" });
  // }
  // if (sexe == "") {
  //   return res.status(200).json({ message: "genre vide" });
  // }
  // if (classe == "") {
  //   return res.status(200).json({ message: "classe vide" });
  // }
  // if (password == "") {
  //   return res.status(200).json({ message: "password vide" });
  // }
  // if (confirme == "") {
  //   return res.status(200).json({ message: "confirme vide" });
  // }

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
            contact,
            sexe,
            password: hashSync(password, 10),
            plateformeId,
          })
          .save();
        return res.status(201).json({ message: "user créer success" });
      }
      res.status(200).json({ message: "user existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await user
    .findAll({
      include: [annonce],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(200).json({ message: "aucun users" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await user
    .findOne({
      where: { id: req.params.id },
      include: [annonce],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "user n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { nom, prenom, email, contact, genre, etab, classe, role, password } =
    req.body;
  const { pic } = req.files;
  const ext = path.extname(pic.name);
  const picName = pic.md5 + ext;
  const picSize = pic.data.length;
  const picUrl = `${req.protocol}://${req.get("host")}/image/${picName}`;
  const allowFormat = ["jpeg", "jpg", "png"];
  if (!allowFormat.includes(ext.toLowerCase())) {
    return res.status(401).json({ message: "format du fichier invalide" });
  }
  if (picSize >= 6000000) {
    return res.status(401).json({ message: "fichier >5MB volumeux" });
  }
  await user
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        unlinkSync(`./public/image/${one.pic}`);
        pic.mv(`./public/image/${picName}`).then(async () => {
          await user.update(
            {
              pic: picName,
              url: picUrl,
              nom,
              prenom,
              email,
              contact,
              genre,
              etab,
              classe,
              role,
              password,
            },
            {
              where: { id: one.id },
            }
          );
          return res.status(200).json({ message: "ecole update" });
        });
      }
      return res.status(200).json({ message: "ecole n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await user
    .destroy({
      where: {},
    })
    .then(() => res.status(200).json({ message: "les user sont supprimer" }))
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await user.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "user n'existe pas" });
    }
    await user
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "user supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await user
    .findAll({
      where: {
        [Op.or]: [{ nom: { [Op.regexp]: u } }, { prenom: { [Op.regexp]: u } }],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "user n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
