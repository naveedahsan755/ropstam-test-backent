const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const db = require("./utils/db");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const categoriesRoute = require("./routes/categories");
const auth = require("./utils/auth");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API v 1.0 working");
});

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/categories", auth, categoriesRoute);

const appStart = async () => {
  await db.connect().catch((err) => console.log(err));

  app.listen(port, () => {
    console.log(`TestCar app listening on port ${port}`);
  });
};

appStart();
