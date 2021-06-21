const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
// const postRoutes = require("./postRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
// router.use("/post", postRoutes);

module.exports = router;
