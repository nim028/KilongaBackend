const { ecole, enseignant, classe } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { nom, anneeScolaire, ecoleId, enseignantId } = req.body;
  await classe
    .findOne({ where: { nom: nom } })
    .then(async (y) => {
      if (!y) {
        await classe
          .build({
            nom,
            anneeScolaire,
            ecoleId,
            enseignantId,
          })
          .save();
        return res.status(201).json({ message: "classe créer success" });
      }
      res.status(401).json({ message: "classe existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await classe
    .findAll({
      include: [ecole, enseignant],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(401).json({ message: "classe annonces" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await classe
    .findOne({
      where: { id: req.params.id },
      include: [ecole, enseignant],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "classe n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { nom, anneeScolaire, ecoleId, enseignantId } = req.body;
  await classe
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        await classe.update(
          {
            nom,
            anneeScolaire,
            ecoleId,
            enseignantId,
          },
          {
            where: { id: one.id },
          }
        );
        return res.status(200).json({ message: "classe update" });
      }
      return res.status(200).json({ message: "classe n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await classe
    .destroy({
      where: {},
    })
    .then(() => res.status(200).json({ message: "les classes sont supprimer" }))
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await classe.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "classe n'existe pas" });
    }
    await classe
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "classe supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await classe
    .findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.regexp]: u } },
          { anneeScolaire: { [Op.regexp]: u } },
        ],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "annonce n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
