const express = require("express");
const routes = require("./routes");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

require("dotenv").config();

const sequelize = require("./config/connection");

const hbs = exphbs.create({ helpers });

const app = express();

const PORT = process.env.PORT || 3001;
// establishing template engine as handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// establishing middlewear

app.use(
    session({
        cookieName: "session",
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialize: true,
        store: new SequelizeStore({
            db: sequelize,
        }),
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);
app.use(express.json);
app.use(express.urlencoded({ extneded: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("App Successful");
    });
});
