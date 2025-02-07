const { login } = require("../auth/signIn");
const { register } = require("../auth/signUp");

const route = require("express").Router();

//login
route.post("/signIn", login);

//register
route.post("/signUp", register);

module.exports = route;
