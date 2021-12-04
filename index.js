const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const db_config = {
  host: "localhost",
  user: "root",
  password: "inthu",
  database: "student",
};
let connection = mysql.createConnection(db_config);
connection.connect((err) => {
  if (err) throw err;
  else console.log("DB Connection Success 1");
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/getDetails", (req, res) => {
  const sqlGet = "SELECT * FROM details";
  connection.query(sqlGet, (error, result) => {
    if (error) throw error;
    else res.json(result);
  });
});

app.post("/insertDetails", (req, res) => {
  const name = req.body.name;
  const grade = req.body.grade;
  const sqlInsert = `INSERT INTO details (name,grade) VALUES ('${name}',${grade})`;
  connection.query(sqlInsert, [name, grade], (error, result) => {
    if (error) throw error;
    else res.json(result);
  });
});

app.put("/updateDetails", (req, res) => {
  const stu = req.body.name;
  const gra = req.body.grade;
  const sqlUpdate = `UPDATE details SET grade = ${gra} WHERE name = '${stu}'`;
  connection.query(sqlUpdate, [gra, stu], (error, result) => {
    if (error) throw error;
    else res.send("Updated Successfully");
  });
});

app.delete("/deleteDetails/:name", (req, res) => {
  const stu = req.params.name;
  const sqlDelete = `DELETE FROM details WHERE name = '${stu}'`;
  connection.query(sqlDelete, stu, (error, result) => {
    if (error) throw error;
    else res.send("Deleted Successfully");
  });
});

app.listen(9000, () => {
  console.log("Server started on port 9000");
});
