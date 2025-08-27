const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
      const { username, password } = req.body;

      const existingUser = await userModel.findOne({
        username,
      });
    
      if (existingUser) {
        return res.status(409).json({
          message: "username Already Exists",
        });
      }

      const user = await userModel.create({
        username,
        password:await bcrypt.hash(password,10) //10 is called SALT
      });

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );

      res.cookie("token", token);

      res.status(201).json({
        message: "user created successfully",
        user,
      });
}

async function loginController(req,res) {
        const { username, password } = req.body;

        const user = await userModel.findOne({
          username,
        });

        if (!user) {
          return res.status(404).json({
            message: "user not found",
          });
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if (!isPasswordValid) {
          return res.status(401).json({
            message: "Incorrect Password",
          });
        }

        const token = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET
        );

        res.cookie("token", token);

        res.status(200).json({
          message: "login Successfull",
          user
        });
}

async function getUserController(req,res) {
        const token = req.cookies.token;

        if (!token) {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {}
}

async function logoutController(req, res) { 
  res.clearCookie("token")
  res.status(200).json({message:"logout Successfull"})
}


module.exports = {
    registerController,
    loginController,
  getUserController,
    logoutController
}

