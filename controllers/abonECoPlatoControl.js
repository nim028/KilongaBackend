const { ecole, plateforme, abonEcoPlato } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { debut, fin, type, statut, plateformeId, ecoleId } = req.body;
  await abonEcoPlato
    .findOne({ where: { titre: titre } })
    .then(async (y) => {
      if (!y) {
        await abonEcoPlato
          .build({
            debut,
            fin,
            type,
            statut,
            plateformeId,
            ecoleId,
          })
          .save();
        return res
          .status(201)
          .json({ message: "abonnement Ecole Plateforme créer success" });
      }
      res
        .status(401)
        .json({ message: "abonnement Ecole Plateforme existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await abonEcoPlato
    .findAll({
      include: [plateforme, ecole],
    })
    .then((all) => {
      if (all.length == 0) {
        return res
          .status(401)
          .json({ message: "aucun abonnement Ecole Plateforme" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await abonEcoPlato
    .findOne({
      where: { id: req.params.id },
      include: [ecole, plateforme],
    })
    .then((one) => {
      if (!one) {
        return res
          .status(200)
          .json({ message: "abonnement Ecole Plateforme n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { debut, fin, type, statut, plateformeId, ecoleId } = req.body;
  await abonEcoPlato
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await abonEcoPlato.update(
          {
            debut,
            fin,
            type,
            statut,
            plateformeId,
            ecoleId,
          },
          {
            where: { id: one.id },
          }
        );
        return res
          .status(200)
          .json({ message: "abonnement Ecole Plateforme update" });
      }
      return res
        .status(200)
        .json({ message: "abonnement Ecole Plateforme n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await abonEcoPlato
    .destroy({
      where: {},
    })
    .then(() =>
      res
        .status(200)
        .json({ message: "les abonnement Ecole Plateforme sont supprimer" })
    )
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await abonEcoPlato.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res
        .status(200)
        .json({ message: "abonnement Ecole Plateforme n'existe pas" });
    }
    await abonEcoPlato
      .destroy({
        where: { id: req.params.id },
      })
      .then(() =>
        res
          .status(200)
          .json({ message: "abonnement Ecole Plateforme supprimer" })
      )
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await abonEcoPlato
    .findAll({
      where: {
        [Op.or]: [
          { debut: { [Op.regexp]: u } },
          { fin: { [Op.regexp]: u } },
          { type: { [Op.regexp]: u } },
          { statut: { [Op.regexp]: u } },
        ],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res
          .status(200)
          .json({ message: "abonnement ecole plateforme  n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
