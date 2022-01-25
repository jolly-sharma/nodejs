const Joi = require("joi");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const { generateJwt } = require("../helpers/generateJwt.js");
const { sendEmail } = require("../helpers/mailer.js");
const User = require("../models/usersmodel");
const randexp = require('randexp').randexp;


const userSchema = Joi.object().keys({
  firstname: Joi.string().min(3).max(25).required(),
  lastname: Joi.string().min(3).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
});

exports.Register = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        status: 400,
        message: result.error.message,
      });
    }

    var user = await User.findOne({
      email: result.value.email,
    });

    if (user) {
      return res.json({
        message: "Email already used",
      });
    }

    const hash = await User.hashPassword(result.value.password);

    const id = uuid(); 
    result.value.userId = id;

    result.value.password = hash;

    code = randexp(/\w{9}/);
    //let code = new Code(/\w{9}/);
    let expiry = Date.now() + 60 * 1000 * 30;

    const sendCode = await sendEmail(result.value.email, code);

    if (sendCode.error) {
      return res.status(500).json({
        message: "Verification email can't be send",
      });
    }
    result.value.emailToken = code;
    result.value.emailTokenExpires = new Date(expiry);

    const newUser = new User(result.value);
    await newUser.save();

    return res.status(200).json({
      //success: true,
      message: "Successfully registered",
    });
  } catch (error) {
    console.error("signup-error", error);
    return res.status(500).json({
      message: "Cannot Register",
    });
  }
};

exports.Activate = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.json({
        status: 400,
        message: "Please make a valid request",
      });
    }
    const user = await User.findOne({
      email: email,
      emailToken: code,
      emailTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Details are not valid",
      });
    } else {
      if (user.active)
        return res.send({
          message: "Account already activated",
          status: 400,
        });

      user.emailToken = "";
      user.emailTokenExpires = null;
      user.active = true;

      await user.save();

      return res.status(200).json({
        message: "Account activated.",
      });
    }
  } catch (error) {
    console.error("activation-error", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Cannot authorize user.",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (!user.active) {
      return res.status(400).json({
        message: "Verify your email to activate your account",
      });
    }

    const isValid = await User.comparePasswords(password, user.password);

    if (!isValid) {
      return res.status(400).json({
        //error: true,
        message: "Invalid credentials",
      });
    }

    const { error, token } = await generateJwt(user.email, user.userId);
    //res.header('auth_token', token).send(token)
    if (error) {
      return res.status(500).json({
        error: true,
        message: "Access Token can't be created.",
      });
    }
    user.accessToken = token;
    await user.save();

    return res.send({
      message: "User logged in successfully",
      accessToken: token,
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      message: "User can't be logged in",
    });
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        status: 400,
        message: "Cannot be processed",
      });
    }
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.send({
        message:
          "Please check your email, email has been sent to your account",
      });
    }

    let code = Math.floor(100000 + Math.random() * 900000);
    const info = await sendEmail(user.email, code);

    if (info.error) {
      return res.status(500).json({
        message: "Couldn't send mail.",
      });
    }

    let expiry = Date.now() + 60 * 1000 * 15;
    user.resetPassToken = code;
    user.resetPassExpires = expiry; // 30 minutes

    await user.save();

    return res.send({
      message:
        "Email has been sent to reset password",
    });
  } catch (error) {
    console.error("forgot-password-error", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    if (!token || !newPassword || !confirmPassword) {
      return res.status(403).json({
        message:
          "Mandatory fields are not provided",
      });
    }
    const user = await User.findOne({
      resetPassToken: req.body.token,
      resetPassExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.send({
        message: "Password reset token is invalid or expired.",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords didn't match",
      });
    }
    const hash = await User.hashPassword(req.body.newPassword);
    user.password = hash;
    user.resetPassToken = null;
    user.resetPassExpires = "";

    await user.save();

    return res.send({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("reset-password-error", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

