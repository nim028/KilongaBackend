const { ecole, eleve, paiement } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { debut, fin, type, statut, eleveId, ecoleId } = req.body;
  await paiement
    .findOne({ where: { titre: titre } })
    .then(async (y) => {
      if (!y) {
        await paiement
          .build({
            debut,
            fin,
            type,
            statut,
            eleveId,
            ecoleId,
          })
          .save();
        return res.status(201).json({ message: "paiement créer success" });
      }
      res.status(401).json({ message: "paiement existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await paiement
    .findAll({
      include: [eleve, ecole],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(401).json({ message: "aucun paiement" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await paiement
    .findOne({
      where: { id: req.params.id },
      include: [ecole, eleve],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "paiement n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { debut, fin, type, statut, eleveId, ecoleId } = req.body;
  await paiement
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await paiement.update(
          {
            debut,
            fin,
            type,
            statut,
            eleveId,
            ecoleId,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "paiement update" });
      }
      return res.status(200).json({ message: "paiement n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await paiement
    .destroy({
      where: {},
    })
    .then(() =>
      res.status(200).json({ message: "les paiements sont supprimer" })
    )
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await paiement.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res
        .status(200)
        .json({ message: "paiement n'existe pas" });
    }
    await paiement
      .destroy({
        where: { id: req.params.id },
      })
      .then(() =>
        res.status(200).json({ message: "paiement  supprimer" })
      )
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await paiement
    .findAll({
      where: {
        [Op.or]: [
          { date: { [Op.regexp]: u } },
          { montant: { [Op.regexp]: u } },
          { type: { [Op.regexp]: u } },
        ],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "paiement n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
