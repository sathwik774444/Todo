const form = document.getElementById("itemForm");
const input = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");

// Add an item
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const item = input.value;
  
  // Send item to the server
  const response = await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: item }),
  });
  
  if (response.ok) {
    input.value = ""; // Clear input
    loadItems(); // Refresh the list
  }
});

// Fetch and display items
async function loadItems() {
  const response = await fetch("http://localhost:3000/items");
  const items = await response.json();
  itemList.innerHTML = ""; // Clear list
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} <button onclick="deleteItem('${item._id}')">Delete</button>`;
    itemList.appendChild(li);
  });
}

// Delete an item
async function deleteItem(id) {
  await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
  loadItems(); // Refresh the list
}

// Initial load
loadItems();
