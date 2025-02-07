const path = require("path");
const { ecole, user} = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { nom, email, lieu,password } = req.body;
  await ecole
    .findOne({ where: { nom: nom } })
    .then(async (y) => {
      if (!y) {
        await ecole
          .build({
            nom,
            email,
            lieu,
            password
          })
          .save();
        return res.status(201).json({ message: "ecole créer success" });
      }
      res.status(401).json({ message: "ecole existe déja" });
    })
    .catch((err) => res.staus(500).json(err.message));
};
const views = async (req, res) => {
  await ecole
    .findAll({
      include: [user],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(401).json({ message: "aucun ecole" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
const view = async (req, res) => {
  await ecole
    .findOne({
      where: { id: req.params.id },
      include: [user],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "ecole n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { nom, position } = req.body;
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
    return res.status(401).json({ message: "fichier volumeux" });
  }
  pic
    .mv(`./public/image/${picName}`)
    .then(async () => {
      await ecole.update(
        { pic: picName, url: picUrl, nom, position },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).json({ message: "ecole update" });
    })
    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await ecole
    .destroy({
      where: {},
    })
    .then(() => res.status(200).json({ message: "les ecole sont supprimer" }))
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await ecole.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "ecole n'existe pas" });
    }
    await ecole
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "ecole supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { e } = req.params;
  await ecole
    .findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.regexp]: e } },
          { position: { [Op.regexp]: e } },
        ],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "ecole n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
