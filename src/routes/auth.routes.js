const express = require("express");
const { registerController , loginController,getUserController} = require('../controllers/auth.controller')


const router = express.Router();



router.post("/register",registerController);
router.post('/login',loginController)
router.get('/user',getUserController)

module.exports = router;
