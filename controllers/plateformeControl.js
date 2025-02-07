const {
  plateforme,
} = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { nom, description, cout } = req.body;
  await plateforme
    .findOne({ where: { nom: nom } })
    .then(async (y) => {
      if (!y) {
        await plateforme
          .build({
            nom,
            description,
            cout,
          })
          .save();
        return res.status(201).json({ message: "plateforme créer success" });
      }
      res.status(401).json({ message: "plateforme existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await plateforme
    .findAll({})
    .then((all) => {
      if (all.length == 0) {
        return res.status(401).json({ message: "aucun palteformes" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await plateforme
    .findOne({
      where: { id: req.params.id },
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "plateforme n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { nom, description, cout } = req.body;
  await plateforme
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await plateforme.update(
          {
            nom,
            description,
            cout,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "plateforme update" });
      }
      return res.status(200).json({ message: "plateforme n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await plateforme
    .destroy({
      where: {},
    })
    .then(() => res.status(200).json({ message: "les plateformes sont supprimer" }))
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await plateforme.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "plateforme n'existe pas" });
    }
    await plateforme
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "plateforme supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await plateforme
    .findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.regexp]: u } },
          { cout: { [Op.regexp]: u } },
        ],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "plateforme n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
