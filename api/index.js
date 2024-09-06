const router = require("express").Router();
module.exports = router;

// /api
router.use("/players", require("./players"));