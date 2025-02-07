const { eleve, service, abonEloServo } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { debut, fin, type, statut, serviceId, eleveId } = req.body;
  await abonEloServo
    .findOne({ where: { titre: titre } })
    .then(async (y) => {
      if (!y) {
        await abonEloServo
          .build({
            debut,
            fin,
            type,
            statut,
            serviceId,
            eleveId,
          })
          .save();
        return res
          .status(201)
          .json({ message: "abonnement eleve service créer success" });
      }
      res
        .status(401)
        .json({ message: "abonnement eleve service existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await abonEloServo
    .findAll({
      include: [service, eleve],
    })
    .then((all) => {
      if (all.length == 0) {
        return res
          .status(401)
          .json({ message: "aucun abonnement eleve service" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await abonEloServo
    .findOne({
      where: { id: req.params.id },
      include: [eleve, service],
    })
    .then((one) => {
      if (!one) {
        return res
          .status(200)
          .json({ message: "abonnement eleve service n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { debut, fin, type, statut, serviceId, eleveId } = req.body;
  await abonEloServo
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await abonEloServo.update(
          {
            debut,
            fin,
            type,
            statut,
            serviceId,
            eleveId,
          },
          {
            where: { id: one.id },
          }
        );
        return res
          .status(200)
          .json({ message: "abonnement eleve service update" });
      }
      return res
        .status(200)
        .json({ message: "abonnement eleve service n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await abonEloServo
    .destroy({
      where: {},
    })
    .then(() =>
      res
        .status(200)
        .json({ message: "les abonnement eleve service sont supprimer" })
    )
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await abonEloServo
    .findOne({ where: { id: req.params.id } })
    .then(async (y) => {
      if (!y) {
        return res
          .status(200)
          .json({ message: "abonnement eleve service n'existe pas" });
      }
      await abonEloServo
        .destroy({
          where: { id: req.params.id },
        })
        .then(() =>
          res
            .status(200)
            .json({ message: "abonnement eleve service supprimer" })
        )
        .catch((err) => res.json(err.message));
    });
};
const search = async (req, res) => {
  const { u } = req.params;
  await abonEloServo
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
          .json({ message: "bonnement eleve service n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
