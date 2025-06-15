import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Fetch items from backend
  const loadItems = async () => {
    const response = await fetch("https://todo-list-5xhj.onrender.com/items");
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Add item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await fetch("https://todo-list-5xhj.onrender.com/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });
    setInput("");
    loadItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await fetch(`https://todo-list-5xhj.onrender.com/items/${id}`, {
      method: "DELETE",
    });
    loadItems();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <input
          type="text"
          value={input}
          placeholder="Enter an item"
          onChange={(e) => setInput(e.target.value)}
          required
          style={{ width: "70%", padding: 8 }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>Add Item</button>
      </form>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            {item.name}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;