const express = require("express");
const {
  signinController,
  signupController,
} = require("../controller/userControllers");

const {
  signinValidator,
  signupValidator,
  validatorResult,
} = require("../middleware/validator");
const router = express.Router();

router.post("/signin", signinValidator, validatorResult, signinController);
router.post("/signup", signupValidator, validatorResult, signupController);

module.exports = router;
