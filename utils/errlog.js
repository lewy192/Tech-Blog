const fs = require("fs");

module.exports.errorLogging = (error) => {
    fs.appendFile("../logs/errorlog.json", error);
};
