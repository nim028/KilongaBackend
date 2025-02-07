const { classe, matiere, enseignant, planning } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { jour, debut, fin, matiereId, classeId, enseignantId } = req.body;
  await planning
    .findOne({ where: { jour: jour } })
    .then(async (y) => {
      if (!y) {
        await planning
          .build({
            jour,
            debut,
            fin,
            matiereId,
            classeId,
            enseignantId,
          })
          .save();
        return res.status(201).json({ message: "planning créer success" });
      }
      res.status(200).json({ message: "planning existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await planning
    .findAll({
      include: [classe, matiere, enseignant],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(200).json({ message: "aucun plannings" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await planning
    .findOne({
      where: { id: req.params.id },
      include: [classe, matiere, enseignant],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "plannning n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { jour, debut, fin, matiereId, classeId, enseignantId } = req.body;
  await planning
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await planning.update(
          {
            jour,
            debut,
            fin,
            matiereId,
            classeId,
            enseignantId,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "planning update" });
      }
      return res.status(200).json({ message: "planning n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await planning
    .destroy({
      where: {},
    })
    .then(() =>
      res.status(200).json({ message: "les plannings sont supprimer" })
    )
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await planning.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "planning n'existe pas" });
    }
    await planning
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "planning supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await planning
    .findAll({
      where: { jour: { [Op.regexp]: u } },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "planning n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
