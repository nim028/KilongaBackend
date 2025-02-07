const route = require("express").Router();

//liste Controller
const aboEcoController = require("../controllers/abonECoPlatoControl");
const aboEleController = require("../controllers/abonEloServoControl");
const absenceController = require("../controllers/absenceControl");
const annonceController = require("../controllers/annonceControl");
const classeController = require("../controllers/classeControl");
const departController = require("../controllers/departementControl");
const ecoleController = require("../controllers/ecoleControl");
const eleveController = require("../controllers/eleveControl");
const enseignantController = require("../controllers/enseignantControl");
const matiereController = require("../controllers/matiereControl");
const noteController = require("../controllers/noteControl");
const paiementController = require("../controllers/paiementControl");
const planningController = require("../controllers/planningControl");
const plateformeController = require("../controllers/plateformeControl");
const serviceController = require("../controllers/matiereControl");
const userController = require("../controllers/userControl");

//CRUD_ecole

route.post("/ecole", ecoleController.create);
route.get("/ecole", ecoleController.views);
route.get("/ecole/:id", ecoleController.view);
route.patch("/ecole/:id", ecoleController.modif);
route.delete("/ecole", ecoleController.supps);
route.delete("/ecole/:id", ecoleController.supp);
route.get("/searchEcole/:e", ecoleController.search);

//plateforme
route.post("/plateforme", plateformeController.create);
route.get("/plateforme", plateformeController.views);
route.get("/plateforme/:id", plateformeController.view);
route.patch("/plateforme/:id", plateformeController.modif);
route.delete("/user", plateformeController.supps);
route.delete("/plateforme/:id", plateformeController.supp);
route.get("/searchPlateforme/:u", plateformeController.search);

//CRUD user:
route.post("/user", userController.create);
route.get("/user", userController.views);
route.get("/user/:id", userController.view);
route.patch("/user/:id", userController.modif);
route.delete("/user", userController.supps);
route.delete("/user/:id", userController.supp);
route.get("/searchUser/:u", userController.search);

//CRUD eleve:
route.post("/eleve", eleveController.create);
route.get("/eleve", eleveController.views);
route.get("/eleve/:id", eleveController.view);
route.patch("/eleve/:id", eleveController.modif);
route.delete("/eleve", eleveController.supps);
route.delete("/eleve/:id", eleveController.supp);
route.get("/searchEleve/:u", eleveController.search);

//CRUD enseignant:
route.post("/enseignant", enseignantController.create);
route.get("/enseignant", enseignantController.views);
route.get("/enseignant/:id", enseignantController.view);
route.patch("/enseignant/:id", enseignantController.modif);
route.delete("/enseignant", enseignantController.supps);
route.delete("/enseignant/:id", enseignantController.supp);
route.get("/searchEnseignant/:u", enseignantController.search);

//CRUD classe:
route.post("/classe", classeController.create);
route.get("/classe", classeController.views);
route.get("/classe/:id", classeController.view);
route.patch("/classe/:id", classeController.modif);
route.delete("/classe", classeController.supps);
route.delete("/classe/:id", classeController.supp);
route.get("/searchClasse/:u", classeController.search);

//CRUD matiere:
route.post("/matiere", matiereController.create);
route.get("/matiere", matiereController.views);
route.get("/matiere/:id", matiereController.view);
route.patch("/matiere/:id", matiereController.modif);
route.delete("/matiere", matiereController.supps);
route.delete("/matiere/:id", matiereController.supp);
route.get("/searchMatiere/:u", matiereController.search);

//CRUD departement:
route.post("/depatement", departController.create);
route.get("/depatement", departController.views);
route.get("/depatement/:id", departController.view);
route.patch("/depatement/:id", departController.modif);
route.delete("/depatement", departController.supps);
route.delete("/depatement/:id", departController.supp);
route.get("/searchDepatement/:u", departController.search);

//CRUD planning:
route.post("/planning", planningController.create);
route.get("/planning", planningController.views);
route.get("/planning/:id", planningController.view);
route.patch("/planning/:id", planningController.modif);
route.delete("/planning", planningController.supps);
route.delete("/planning/:id", planningController.supp);
route.get("/searchPlanning/:u", planningController.search);

//CRUD note:
route.post("/note", noteController.create);
route.get("/note", noteController.views);
route.get("/note/:id", noteController.view);
route.patch("/note/:id", noteController.modif);
route.delete("/note", noteController.supps);
route.delete("/note/:id", noteController.supp);
route.get("/searchNote/:u", noteController.search);

//CRUD absence:
route.post("/absence", absenceController.create);
route.get("/absence", absenceController.views);
route.get("/absence/:id", absenceController.view);
route.patch("/absence/:id", absenceController.modif);
route.delete("/absence", absenceController.supps);
route.delete("/absence/:id", absenceController.supp);
route.get("/searchAbsence/:u", absenceController.search);

//CRUD service:
route.post("/service", serviceController.create);
route.get("/service", serviceController.views);
route.get("/service/:id", serviceController.view);
route.patch("/service/:id", serviceController.modif);
route.delete("/service", serviceController.supps);
route.delete("/service/:id", serviceController.supp);
route.get("/searchService/:u", serviceController.search);

//CRUD abonnement ecole_plateforme:
route.post("/aboEcole", aboEcoController.create);
route.get("/aboEcole", aboEcoController.views);
route.get("/aboEcole/:id", aboEcoController.view);
route.patch("/aboEcole/:id", aboEcoController.modif);
route.delete("/aboEcole", aboEcoController.supps);
route.delete("/aboEcole/:id", aboEcoController.supp);
route.get("/searchaboEcole/:u", aboEcoController.search);

//CRUD abonnement eleve_service:
route.post("/aboEleve", aboEleController.create);
route.get("/aboEleve", aboEleController.views);
route.get("/aboEleve/:id", aboEleController.view);
route.patch("/aboEleve/:id", aboEleController.modif);
route.delete("/aboEleve", aboEleController.supps);
route.delete("/aboEleve/:id", aboEleController.supp);
route.get("/searchaboEleve/:u", aboEleController.search);

//CRUD paiement:
route.post("/paiement", paiementController.create);
route.get("/paiement", paiementController.views);
route.get("/paiement/:id", paiementController.view);
route.patch("/paiement/:id", paiementController.modif);
route.delete("/paiement", paiementController.supps);
route.delete("/paiement/:id", paiementController.supp);
route.get("/searchpaiement/:u", paiementController.search);

//CRUD annonce:
route.post("/annonce", annonceController.create);
route.get("/annonce", annonceController.views);
route.get("/annonce/:id", annonceController.view);
route.patch("/annonce/:id", annonceController.modif);
route.delete("/annonce", annonceController.supps);
route.delete("/annonce/:id", annonceController.supp);
route.get("/searchAnnonce/:u", annonceController.search);

//Page not_found:

route.all("*", (req, res) => {
  return res.status(404).json({ message: "page not found" });
});

module.exports = route;
