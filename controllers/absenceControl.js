const { absence, eleve } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { date, motif, eleveId } = req.body;
  await absence
    .findOne({ where: { titre: titre } })
    .then(async (y) => {
      if (!y) {
        await absence
          .build({
            date,
            motif,
            eleveId,
          })
          .save();
        return res.status(201).json({ message: "absence créer success" });
      }
      res.status(401).json({ message: "absence existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await absence
    .findAll({
      include: [eleve],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(401).json({ message: "aucun ansences" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await absence
    .findOne({
      where: { id: req.params.id },
      include: [eleve],
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
  const { date, motif, eleveId } = req.body;
  await absence
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await absence.update(
          {
            date,
            motif,
            eleveId,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "absence update" });
      }
      return res.status(200).json({ message: "absence n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await absence
    .destroy({
      where: {},
    })
    .then(() => res.status(200).json({ message: "les absences sont supprimer" }))
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await absence.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "absence n'existe pas" });
    }
    await absence
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "absence supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await absence
    .findAll({
      where: {
        [Op.or]: [
          { motif: { [Op.regexp]: u } },
          { date: { [Op.regexp]: u } },
        ],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "absence n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
