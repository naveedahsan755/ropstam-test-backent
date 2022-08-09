const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../utils/db");

router.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await db.User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist." });
      }

      const check = await bcrypt.compare(password, user.password);
      if (!check) {
        return res.status(401).json({ error: "Password Incorrect." });
      }

      const token = await jwt.sign(
        {
          data: { id: user._id, name: user.name, cat_id: user.categories._id },
        },
        process.env.SECRET_KEY,
        { expiresIn: 60 * 60 }
      );

      user.token = token;
      await user.save();

      return res.status(200).json({
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          token: user.token,
        },
        message: "User successfully logged in.",
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
);

module.exports = router;
