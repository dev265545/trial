const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("inventory.db");

// Your JSON data
const jsonData = [
  {
    Itemcode: "RD-180-6",
    "Item Name": "RD-180ML-6.0[1000pcs]",
    Weight: 6,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "RD-200-6",
    "Item Name": "RD-200ML-6.0[1000pcs]",
    Weight: 6,
    "cu.ft": 5.27,
  },
];

// Create a table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS items (
  Itemcode TEXT,
  ItemName TEXT,
  Weight INTEGER,
  cubicft REAL
)`);

// Insert data into the table
const insertStatement = db.prepare(
  "INSERT INTO items (Itemcode, ItemName, Weight, cubicft) VALUES (?, ?, ?, ?)"
);
jsonData.forEach((item) => {
  insertStatement.run(
    item.Itemcode,
    item["Item Name"],
    item.Weight,
    item["cu.ft"]
  );
});

// Finalize the statement to close it
insertStatement.finalize();

// Close the database connection
db.close();
