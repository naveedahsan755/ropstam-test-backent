const express = require("express");
const router = express.Router();

const db = require("../utils/db");

router.get("/", async (req, res) => {
  try {
    const { categories } = await db.User.findOne({
      _id: req.user.data.id,
    }).populate("categories");

    return res.status(200).json({ data: categories.categories });
  } catch {
    return res.status(400).json({ error: "Something went wrong." });
  }
});

router.post("/", async (req, res) => {
  try {
    const categories = await db.Category.findOne({ _id: req.user.data.cat_id });
    categories.categories = req.body;
    await categories.save();
    return res
      .status(201)
      .json({ message: "categories saved", data: categories });
  } catch {
    return res.status(400).json({ error: "Something went wrong." });
  }
});

module.exports = router;
