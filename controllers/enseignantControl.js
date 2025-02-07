const path = require("path");
const { unlinkSync } = require("fs");
const { ecole, user, enseignant, departement } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res) => {
  const { nom, prenom, telephone, email, ecoleId, departementId } = req.body;
  await enseignant
    .findOne({ where: { email: email } })
    .then(async (y) => {
      if (!y) {
        await enseignant
          .build({
            nom,
            prenom,
            telephone,
            email,
            ecoleId,
            departementId,
          })
          .save();
        return res.status(201).json({ message: "enseignant créer success" });
      }
      res.status(200).json({ message: "enseignant existe déja" });
    })
    .catch((err) => res.json(err.message));
};
const views = async (req, res) => {
  await enseignant
    .findAll({
      include: [ecole, departement],
    })
    .then((all) => {
      if (all.length == 0) {
        return res.status(200).json({ message: "aucun enseignants" });
      }
      return res.status(200).json(all);
    })
    .catch((err) => res.json(err.message));
};
const view = async (req, res) => {
  await enseignant
    .findOne({
      where: { id: req.params.id },
      include: [ecole, departement],
    })
    .then((one) => {
      if (!one) {
        return res.status(200).json({ message: "enseignant n'existe pas" });
      }
      return res.status(200).json(one);
    })
    .catch((err) => res.json(err.message));
};
const modif = async (req, res) => {
  const { nom, prenom, telephone, email, ecoleId, departementId } = req.body;
  const { pic } = req.files;
  const ext = path.extname(pic.name);
  const picName = pic.md5 + ext;
  const picSize = pic.data.length;
  const picUrl = `${req.protocol}://${req.get("host")}/image/${picName}`;
  const allowFormat = ["jpeg", "jpg", "png"];
  if (!allowFormat.includes(ext.toLowerCase())) {
    return res.status(401).json({ message: "format du fichier invalide" });
  }
  if (picSize >= 6000000) {
    return res.status(401).json({ message: "fichier >5MB volumeux" });
  }
  await user
    .findOne({ where: { id: req.params.id } })
    .then(async (one) => {
      if (one) {
        unlinkSync(`./public/image/${one.pic}`);
        pic.mv(`./public/image/${picName}`).then(async () => {
          await departement.update(
            {
              pic: picName,
              url: picUrl,
              nom,
              prenom,
              telephone,
              email,
              ecoleId,
              departementId,
            },
            {
              where: { id: one.id },
            }
          );
          return res.status(200).json({ message: "enseignant update" });
        });
      }
      return res.status(200).json({ message: "enseignant n'existe pas" });
    })

    .catch((err) => res.json(err.message));
};
const supps = async (req, res) => {
  await enseignant
    .destroy({
      where: {},
    })
    .then(() =>
      res.status(200).json({ message: "les enseignants sont supprimer" })
    )
    .catch((err) => res.json(err.message));
};
const supp = async (req, res) => {
  await enseignant.findOne({ where: { id: req.params.id } }).then(async (y) => {
    if (!y) {
      return res.status(200).json({ message: "enseignant n'existe pas" });
    }
    await enseignant
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => res.status(200).json({ message: "enseignant supprimer" }))
      .catch((err) => res.json(err.message));
  });
};
const search = async (req, res) => {
  const { u } = req.params;
  await enseignant
    .findAll({
      where: {
        [Op.or]: [{ nom: { [Op.regexp]: u } }, { prenom: { [Op.regexp]: u } }],
      },
    })
    .then((y) => {
      if (y.length == 0) {
        return res.status(200).json({ message: "user n'existe pas" });
      }
      return res.status(200).json(y);
    });
};
module.exports = { create, views, view, modif, supp, supps, search };
