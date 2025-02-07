const { ecole, departement } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { nom, ecoleId } = req.body;
  await departement
    .findOne({ where: { nom: nom } })
    .then(async (y) => {
      if (!y) {
        await matiere
          .build({
            nom,
            ecoleId,
          })
          .save();
        return res.status(201).json({ message: "departement créer success" });
      }
      res.status(200).json({ message: "departement existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await departement
    .findAll({
      include: [ecole],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(200).json({ message: "aucun departements" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await departement
    .findOne({
      where: { id: req.params.id },
      include: [ecole],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "departement n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { nom, ecoleId } = req.body;
  await departement
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await departement.update(
          {
            nom,
            ecoleId,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "departement update" });
      }
      return res.status(200).json({ message: "departement n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await departement
    .destroy({
      where: {},
    })
    .then(() =>
      res.status(200).json({ message: "les deparetements sont supprimer" })
    )
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await departement
    .findOne({ where: { id: req.params.id } })
    .then(async (y) => {
      if (!y) {
        return res.status(200).json({ message: "departement n'existe pas" });
      }
      await departement
        .destroy({
          where: { id: req.params.id },
        })
        .then(() => res.status(200).json({ message: "departement supprimer" }))
        .catch((err) => res.json(err.message));
    });
};
const search = async (req, res) => {
  const { u } = req.params;
  await departement
    .findAll({
      where: { nom: { [Op.regexp]: u } },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "departement n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
