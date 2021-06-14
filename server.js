const express = require("express");
const routes = require("./routes");
const session = require("express-sessions");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const path = require("path");

require("dotenv").config();

const sequelize = require("./config/connection");

const hbs = exphbs.create({ helpers });

const app = express();

const PORT = process.env.PORT || 3001;
// establishing template engine as handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// establishing middlewear

app.use(session({ cookieName: "session", secret: process.env.COOKIE_SECRET }));
app.use(express.json);
app.use(express.urlencoded({ extneded: true }));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("App Successful");
    });
});
