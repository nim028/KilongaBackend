const { ecole, service } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { nom, description, cout, ecoleId } = req.body;
  await service
    .findOne({ where: { titre: titre } })
    .then(async (y) => {
      if (!y) {
        await service
          .build({
            nom,
            description,
            cout,
            ecoleId,
          })
          .save();
        return res.status(201).json({ message: "service créer success" });
      }
      res.status(401).json({ message: "service existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await service
    .findAll({
      include: [ecole],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(401).json({ message: "aucun services" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await service
    .findOne({
      where: { id: req.params.id },
      include: [ecole],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "service n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { nom, description, cout, ecoleId } = req.body;
  await service
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await service.update(
          {
            nom,
            description,
            cout,
            ecoleId,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "service update" });
      }
      return res.status(200).json({ message: "service n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await service
    .destroy({
      where: {},
    })
    .then(() =>
      res.status(200).json({ message: "les services sont supprimer" })
    )
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await service.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "service n'existe pas" });
    }
    await service
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "absence supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await service
    .findAll({
      where: {
        [Op.or]: [{ nom: { [Op.regexp]: u } }, { cout: { [Op.regexp]: u } }],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "service n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
