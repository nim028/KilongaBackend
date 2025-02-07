const { ecole, departement, matiere } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { nom, departementId, ecoleId } = req.body;
  await matiere
    .findOne({ where: { nom: nom } })
    .then(async (y) => {
      if (!y) {
        await matiere
          .build({
            nom,
            departementId,
            ecoleId,
          })
          .save();
        return res.status(201).json({ message: "matiere créer success" });
      }
      res.status(200).json({ message: "matiere existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await matiere
    .findAll({
      include: [departement, ecole],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(200).json({ message: "aucun matieres" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await matiere
    .findOne({
      where: { id: req.params.id },
      include: [departement, ecole],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "matiere n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { nom, departementId, ecoleId } = req.body;
  const { pic } = req.files;
  await matiere
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await matiere.update(
          {
            nom,
            departementId,
            ecoleId,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "matiere update" });
      }
      return res.status(200).json({ message: "matiere n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await matiere
    .destroy({
      where: {},
    })
    .then(() =>
      res.status(200).json({ message: "les matieres sont supprimer" })
    )
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await matiere.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "matiere n'existe pas" });
    }
    await matiere
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "matiere supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await matiere
    .findAll({
      where: { nom: { [Op.regexp]: u } },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "matiere n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
