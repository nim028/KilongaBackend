const {
  ecole,
  plateforme,
  user,
  eleve,
  enseignant,
  classe,
  matiere,
  departement,
  planning,
  note,
  absence,
  service,
  abonEcoPlato,
  abonEloServo,
  paiement,
  annonce,
} = require("../models");

function relation() {
  //1
  plateforme.hasMany(ecole);
  ecole.belongsTo(plateforme);

  //2
  ecole.hasMany(eleve);
  eleve.belongsTo(ecole);

  //3
  classe.hasMany(eleve);
  eleve.belongsTo(classe);

  //4
  ecole.hasMany(enseignant);
  enseignant.belongsTo(ecole);

  //5
  ecole.hasMany(departement);
  departement.belongsTo(ecole);

  ecole.hasMany(classe);
  classe.belongsTo(ecole);

  enseignant.hasMany(classe);
  classe.belongsTo(enseignant);

  departement.hasMany(matiere);
  matiere.belongsTo(departement);

  ecole.hasMany(matiere);
  matiere.belongsTo(ecole);

  classe.hasMany(planning);
  planning.belongsTo(classe);

  matiere.hasMany(planning);
  planning.belongsTo(matiere);

  enseignant.hasMany(planning);
  planning.belongsTo(enseignant);

  eleve.hasMany(note);
  note.belongsTo(eleve);

  matiere.hasMany(note);
  note.belongsTo(matiere);

  eleve.hasMany(absence);
  absence.belongsTo(eleve);

  ecole.hasMany(service);
  service.belongsTo(ecole);

  ecole.hasMany(abonEcoPlato);
  abonEcoPlato.belongsTo(ecole);

  plateforme.hasMany(abonEcoPlato);
  abonEcoPlato.belongsTo(plateforme);

  eleve.hasMany(abonEloServo);
  abonEloServo.belongsTo(eleve);

  service.hasMany(abonEloServo);
  abonEloServo.belongsTo(service);

  ecole.hasMany(paiement);
  paiement.belongsTo(ecole);

  eleve.hasMany(paiement);
  paiement.belongsTo(eleve);

  user.hasMany(annonce);
  annonce.belongsTo(user);
}
module.exports = { relation };
