const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Enable JSON server router
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.use(express.json());
app.use(middlewares);

// API routes
app.use("/pitches", router);

// Home route
app.get("/", (req, res) => {
  res.send("Shark Tank backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
