const express = require("express");
const cors = require("cors");
const connectdb = require("./db");
const bodyParser = require("body-parser");
const Item = require('./model/schema');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectdb();


// Routes
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.status(201).send("Item added");
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(200).send("Item deleted");
});

// Start server
app.listen(process.env.PORT , () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
