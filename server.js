console.clear();

const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const PORT = process.env.PORT || 3333;

const app = express();
//adding middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//
// handles get request for the home page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
//
// handles get request for the note page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
//
// gets any existing notes from the array
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "db/db.json"))
);
//
// adds new notes into the array
app.post("/api/notes", async (req, res) => {
  //takes
  const dataToRead = await fs.readFile("./db/db.json", "utf8");
  //
  const parsedData = JSON.parse(dataToRead);
  // pushing
  parsedData.push({
    ...req.body,
    id: Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .toString(1),
  });

  const stringifiedData = JSON.stringify(parsedData);

  await fs.writeFile("./db/db.json", stringifiedData);
  res.send();
});

app.delete("/api/notes/:id", async (req, res) => {
  const dataToRead = await fs.readFile("./db/db.json", "utf8");

  const parsedData = JSON.parse(dataToRead);

  const notes = parsedData.filter((note) => note.id !== req.params.id);

  const stringifiedData = JSON.stringify(notes);

  await fs.writeFile("./db/db.json", stringifiedData);
  res.send("bye");
});
//
//
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
//
// const {title, text} = req.body
