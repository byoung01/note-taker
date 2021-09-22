console.clear();

const express = require("express");
const path = require("path");
const PORT = 3333;
const fs = require("fs/promises");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//
//
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
//
//
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
//
//
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "db/db.json"))
);
//
//
app.post("/api/notes", async (req, res) => {
  const dataToRead = await fs.readFile("./db/db.json", "utf8");

  const parsedData = JSON.parse(dataToRead);

  parsedData.push(req.body);

  const stringifiedData = JSON.stringify(parsedData);

  await fs.writeFile("./db/db.json", stringifiedData);
  res.send("whatever");
});
//
//
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
//
// const {title, text} = req.body
