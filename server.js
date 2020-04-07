const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controller/register");
const signin = require("./controller/signin");
const profile = require("./controller/profile");
const image = require("./controller/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test123",
    database: "smartbrain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", register.handleRegister(db, bcrypt));

app.post("/signin", signin.handleSignin(db, bcrypt));

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`Server is listening on part ${PORT}`);
});
