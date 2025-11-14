const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS so Netlify can talk to Render
app.use(cors());

// Set up JSON Server router
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.use(express.json());
app.use(middlewares);

// Mount JSON Server routes
app.use("/pitches", router);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Shark Tank backend is running on Render!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
