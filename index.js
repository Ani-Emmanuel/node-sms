const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const Nexmo = require("nexmo");
require("dotenv").config();
const app = express();

//init nexmo
const nexmo = new Nexmo(
  {
    apiKey: process.env.KEY,
    apiSecret: process.env.SECRET
  },
  { debug: true }
);

//setting up bodyparser middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//configuring port and hostname
const port = process.env.PORT || 3000;
const hostname = "localhost";

//setting up ejs engine
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//serving the view component
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  from = req.body.from;
  to = req.body.to;
  text = req.body.message;

  nexmo.message.sendSms(from, to, text, (err, reply) => {
    if (err) return new Error("Sorry the message did not when through");
    console.log(reply);
  });
  // res.send(req.body);
});

//starting up the server
app.listen(port, () => console.log(`Server started on ${hostname}:${port}`));
