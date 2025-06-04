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
// Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/database")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error(err));

// // Item schema and model
// const itemSchema = new mongoose.Schema({ name: String });
// const Item = mongoose.model("Item", itemSchema);



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
app.listen(process.env.port , () => {
  console.log(`Server running on http://localhost:${process.env.port}`);
});
