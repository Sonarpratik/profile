const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const mongo = require("./db/conn");
const Register = require("./models/reg");

const connectRe = async () => {
  await mongo().then((mongo) => {
    try {
      console.log("connect to mongodb!!!");
    } catch (err) {
      console.log("no connected");
    } finally {
      // mongo.connection.close()
    }
  });
};

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectRe();

app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/follow", (req, res) => {
  res.render("follow");
});
app.post("/", (req, res) => {
  try {
    var registerpassword = new Register({
      fullname: req.body.fullname,
      number: req.body.number,
      email: req.body.email,
      password: req.body.password,
    });
    registerpassword.save((err, data) => {
      if (err) {
        console.error(err);
      } else {


        res.status(201).render("phone");

        app.get("*", (req, res) => {
          res.render("error");
        });
      }
    });
  } catch (error) {
    res.render("error");
  }
});

app.get("*", (req, res) => {
  res.render("error");
});

app.listen(port, () => {
  console.log(`server is runing at poort no ${port}`);
});
