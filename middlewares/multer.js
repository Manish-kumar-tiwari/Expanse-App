const multer = require("multer");

const storage = multer.memoryStorage();

const uplode = multer({ storage });

module.exports = uplode;
