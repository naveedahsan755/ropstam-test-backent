const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const router = express.Router();

const db = require("../utils/db");
const makeRandomString = require("../utils/randomString");
const sendMail = require("../utils/send_mail");

router.post(
  "/",
  body("name").isLength({ min: 4 }),
  body("email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    const pass = makeRandomString(8);
    const password = await bcrypt.hash(pass, 8);

    try {
      let user = await db.User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
      const categories = new db.Category({ categories: [] });
      user = new db.User({ name, email, password, categories: categories._id });

      await user.save();
      await categories.save();

      sendMail(email, pass).catch((err) =>
        res.status(400).json({ error: err })
      );
      res.status(201).json({
        message:
          "User successfully created. Please check your mail to get password and sign in.",
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
);

module.exports = router;
