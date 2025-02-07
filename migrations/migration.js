const dataBase = require("../models");
const migration = (app, port, state) => {
  dataBase.sequelize.sync({ alter: state }).then(() => {
    app.listen(port, console.log(`http://localhost:${port}`));
  });
};
module.exports = { migration };
