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
  const { titre, contenu } = req.body;
  await annonce
    .findOne({ where: { titre: titre } })
    .then(async (y) => {
      if (!y) {
        await annonce
          .build({
            titre,
            contenu,
            userId: req.user.id,
          })
          .save();
        return res.status(201).json({ message: "annonce créer success" });
      }
      res.status(401).json({ message: "annonce existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await annonce
    .findAll({
      include: [user],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(401).json({ message: "aucun annonces" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await annonce
    .findOne({
      where: { id: req.params.id },
      include: [user],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "annonce n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { titre, contenu } = req.body;
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
  await annonce
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        unlinkSync(`./public/image/${one.pic}`);
        pic.mv(`./public/image/${picName}`).then(async () => {
          await annonce.update(
            {
              pic: picName,
              url: picUrl,
              titre,
              contenu,
            },
            {
              where: { id: one.id },
            }
          );
          return res.status(200).json({ message: "annonce update" });
        });
      }
      return res.status(200).json({ message: "annonce n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await annonce
    .destroy({
      where: {},
    })
    .then(() => res.status(200).json({ message: "les user sont supprimer" }))
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await annonce.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "user n'existe pas" });
    }
    await annonce
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "user supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await annonce
    .findAll({
      where: {
        [Op.or]: [
          { titre: { [Op.regexp]: u } },
          { contenu: { [Op.regexp]: u } },
        ],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "annonce n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
