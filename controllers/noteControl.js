const { matiere, eleve, note } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { noti, date, matiereId, eleveId } = req.body;
  await note
    .findOne({ where: { jour: jour } })
    .then(async (y) => {
      if (!y) {
        await note
          .build({
            noti,
            date,
            matiereId,
            eleveId,
          })
          .save();
        return res.status(201).json({ message: "note créer success" });
      }
      res.status(200).json({ message: "note existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await note
    .findAll({
      include: [eleve, matiere],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(200).json({ message: "aucun notes" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await note
    .findOne({
      where: { id: req.params.id },
      include: [eleve, matiere],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "note n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { note, date, matiereId, eleveId } = req.body;
  await note
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await note.update(
          {
            note,
            date,
            matiereId,
            eleveId,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "note update" });
      }
      return res.status(200).json({ message: "note n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await note
    .destroy({
      where: {},
    })
    .then(() => res.status(200).json({ message: "les notes sont supprimer" }))
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await note.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "note n'existe pas" });
    }
    await note
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "note supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await note
    .findAll({
      where: { noti: { [Op.regexp]: u } },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "note n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
