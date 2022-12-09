const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "sqluser2",
  password: "password",
  database: "betwagers",
});

app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM sportswagers";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const wager = req.body.wager;
  const league = req.body.league;
  const winLoss = req.body.winLoss;

  const sqlInsert =
    "INSERT INTO sportswagers (wager, league, winLoss) VALUES (?,?,?)";
  db.query(sqlInsert, [wager, league, winLoss], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:wager", (req, res) => {
  const wager = req.params.wager;
  const sqlDelete = "DELETE FROM sportswagers WHERE wager = ?";

  db.query(sqlDelete, wager, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update/:id", (req, res) => {
  const wager = req.body.wager;
  const winloss = req.body.winloss;
  const sqlUpdate = "UPDATE sportswagers SET winloss = ? WHERE id = ?";

  db.query(sqlUpdate, [winloss, wager], (err, result) => {
    if (err) console.log(err);
  });
});
//Tried to change the identiier from wager to id when updating but I broke it and ran out of time(: Will be fixing

app.listen(3001, () => {
  console.log("running on port 3001");
});
