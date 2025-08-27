const express = require("express");
const { registerController , loginController,getUserController, logoutController} = require('../controllers/auth.controller')


const router = express.Router();



router.post("/register",registerController);
router.post('/login', loginController)
router.post('/logout',logoutController)
router.get('/user',getUserController)

module.exports = router;


