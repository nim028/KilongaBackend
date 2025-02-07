const path = require("path");
const { unlinkSync } = require("fs");
const {
  ecole,
  user,
  eleve,
  classe,
} = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const {
    nom,
    prenom,
    dateNaissance,
    adresse,
    telephone,
    email,
    ecoleId,
    classeId,
  } = req.body;
  await user
    .findOne({ where: { email: email } })
    .then(async (y) => {
      if (!y) {
        await user
          .build({
            nom,
            prenom,
            dateNaissance,
            adresse,
            telephone,
            email,
            ecoleId,
            classeId,
          })
          .save();
        return res.status(201).json({ message: "eleve créer success" });
      }
      res.status(200).json({ message: "eleve existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await eleve
    .findAll({
      include: [ecole, classe],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(200).json({ message: "aucun eleves" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await eleve
    .findOne({
      where: { id: req.params.id },
      include: [ecole, classe],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "eleve n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const {
    nom,
    prenom,
    dateNaissance,
    adresse,
    telephone,
    email,
    ecoleId,
    classeId,
  } = req.body;
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
  await eleve
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        unlinkSync(`./public/image/${one.pic}`);
        pic.mv(`./public/image/${picName}`).then(async () => {
          await eleve.update(
            {
              pic: picName,
              url: picUrl,
              nom,
              prenom,
              dateNaissance,
              adresse,
              telephone,
              email,
              ecoleId,
              classeId,
            },
            {
              where: { id: one.id },
            }
          );
          return res.status(200).json({ message: "eleve update" });
        });
      }
      return res.status(200).json({ message: "eleve n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await eleve
    .destroy({
      where: {},
    })
    .then(() => res.status(200).json({ message: "les eleves sont supprimer" }))
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await eleve.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "eleve n'existe pas" });
    }
    await eleve
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "eleve supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await eleve
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
