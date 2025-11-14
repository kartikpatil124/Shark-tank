const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Create JSON Server router
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use("/", router); // 👈 Mount at root

app.get("/", (req, res) => {
  res.send("✅ Shark Tank backend is running on Render!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
