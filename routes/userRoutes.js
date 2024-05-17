const express = require("express");
const {
  loginControler,
  registerControler,
  updateProfile,
  googleControler,
  
} = require("../controllers/userControler");
const uplode = require("../middlewares/multer");
const router = express.Router();

// login routes

router.post("/login", loginControler);

router.post("/google", googleControler);

//register routes

router.post("/register", registerControler);

// update profile routes
router.post("/update-profile", uplode.single("photo"), updateProfile);



module.exports = router;
