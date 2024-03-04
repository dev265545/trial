const path = require("path");
const fs = require("fs");
const { app } = require("electron");
const sqlite3 = require("sqlite3").verbose();

// Build the database path and output to the console
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
const appDataPath = app.getPath("appData");
const databasePath = path.join(appDataPath, "inventory.db");
console.log(`Database Path: ${databasePath}`);

// Creates a new SQLite database instance and add an error handler;
var db = null;

// Initialize the database module
const init = (appWindow) => {
  if (fs.existsSync(databasePath)) {
    console.log("Database file already exists.");

    // Create a new database instance and adds a error handler
    db = new sqlite3.Database(databasePath);
    db.on("error", (err) => {
      console.error(`Database error: ${err.message}`);
      db.close();
    });

    // Notify the front-end that database is ready
    appWindow.webContents.send("databaseReady");
  } else {
    // If the database file doesn't exists, create it
    build(appWindow);
  }
};

const build = (appWindow) => {
  console.log("Building database file");

  // Create a new database instance and adds a error handler
  db = new sqlite3.Database(databasePath);
  db.on("error", (err) => {
    console.error(`Database error: ${err.message}`);
    db.close();
  });

  db.serialize(() => {
    // Create the table for storing items
    db.run(`CREATE TABLE IF NOT EXISTS OrderDetails (
  StationName TEXT,
  SerialNo TEXT,
  PartyName TEXT,
  Date DATE,
  TotalQuantity INTEGER,
  TotalCubicFeet REAL,
  TotalFeet REAL,
  ItemsArray TEXT
)`);
    db.run(`CREATE TABLE IF NOT EXISTS items (
  Itemcode TEXT,
  ItemName TEXT,
  Weight INTEGER,
  cubicft REAL
)`);
    db.run(`CREATE TABLE IF NOT EXISTS Users (
  ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  UserName TEXT,
  Password TEXT,
  IsAdmin BOOLEAN
  
)`);
    console.log("Created users");
    db.run(
      `INSERT INTO Users (ID, UserName, Password,IsAdmin) VALUES(1,'DEV','12345',True)`
    );
    db.run(
      `INSERT INTO Users (ID, UserName, Password,IsAdmin) VALUES(2,'DEV2','12345',False)`
    );
    console.log("Created superuser");
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

    insertStatement.finalize();
    // Notify the front-end that database is ready
    appWindow.webContents.send("databaseReady");
  });
};

const insertData = (payload, cb) => {
  console.log(payload);
  // Get fields from the payload
  let { Itemcode, ItemName, Weight, cubicft } = payload;

  // Insert the fields into the database
  db.run(
    `INSERT INTO items (Itemcode, ItemName, Weight, cubicft) VALUES (?, ?, ?, ?)`,
    [Itemcode, ItemName, Weight, cubicft],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true });
      }
    }
  );
};
const insertDataOrder = (payload, cb) => {
  // Get fields from the payload
  let {
    StationName,
    SerialNo,
    PartyName,
    Date,
    TotalQuantity,
    TotalCubicFeet,
    TotalFeet,
    ItemsArray,
  } = payload;

  // Convert ItemsArray to a JSON string
  const serializedItemsArray = JSON.stringify(ItemsArray);

  // Insert the fields into the database
  db.run(
    `INSERT INTO OrderDetails (StationName, SerialNo, PartyName, Date, TotalQuantity, TotalCubicFeet, TotalFeet, ItemsArray) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      StationName,
      SerialNo,
      PartyName,
      Date,
      TotalQuantity,
      TotalCubicFeet,
      TotalFeet,
      serializedItemsArray,
    ],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true, message: "Success" });
      }
    }
  );
};
const getData = (id = null, cb) => {
  // Build the query to fetch all items. If an ID is passed,
  // the query will search for items with corresponding id.
  let query = `SELECT * FROM items ${id ? `WHERE id = ${id}` : ""}`;

  // Run the query
  db.all(query, (err, rows) => {
    if (err) {
      cb({ success: false, error: err.message });
    } else {
      cb({ success: true, data: rows });
    }
  });
};

const register = (payload, cb) => {
  let { username, password, role } = payload;
  db.run(
    "INSERT INTO users (username, password, role) VALUES(?,?,?)",
    [username, password, role],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true, message: "Success" });
      }
    }
  );
};
const login = (payload, cb) => {
  console.log(payload);
  let { UserName, Password } = payload;
  let query = `SELECT * FROM USERS  WHERE UserName = '${UserName}' AND Password = '${Password}'`;
  console.log(query);
  // Run the query
  db.all(query, (err, rows) => {
    if (err) {
      cb({ success: false, error: err.message });
    } else {
      cb({ success: true, data: rows });
    }
  });
};

const updateData = (payload, cb) => {
  // Get fields from the payload
  let { Itemcode, ItemName, Weight, cubicft, oldItemcode } = payload;
  console.log(payload);

  // Update the item
  db.run(
    `UPDATE items SET Itemcode = ?, ItemName = ?, Weight = ?, cubicft = ? WHERE Itemcode = ?`,
    [Itemcode, ItemName, Weight, cubicft, oldItemcode],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true });
      }
    }
  );
};

const deleteData = (id = null, cb) => {
  console.log(id);
  // Delete the item from the database
  db.run(`DELETE FROM items WHERE Itemcode = ?`, [id], (err) => {
    if (err) {
      cb({ success: false, error: err.message });
    } else {
      cb({ success: true });
    }
  });
};
const getDataOrder = (id = null, cb) => {
  // Build the query to fetch all records. If a StationName is passed,
  // the query will search for records with the corresponding StationName.
  let query = `SELECT * FROM OrderDetails`;

  // Run the query
  db.all(query, (err, rows) => {
    if (err) {
      cb({ success: false, error: err.message });
    } else {
      cb({ success: true, data: rows });
    }
  });
};

const updateDataOrder = (payload, cb) => {
  // Get fields from the payload
  let {
    StationName,
    SerialNo,
    PartyName,
    Date,
    TotalQuantity,
    TotalCubicFeet,
    TotalFeet,
    ItemsArray,
  } = payload;

  // Convert ItemsArray to a JSON string
  const serializedItemsArray = JSON.stringify(ItemsArray);

  // Update the record
  db.run(
    `UPDATE OrderDetails SET SerialNo = ?, PartyName = ?, Date = ?, TotalQuantity = ?, 
    TotalCubicFeet = ?, TotalFeet = ?, ItemsArray = ? WHERE StationName = ?`,
    [
      SerialNo,
      PartyName,
      Date,
      TotalQuantity,
      TotalCubicFeet,
      TotalFeet,
      serializedItemsArray,
      StationName,
    ],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true });
      }
    }
  );
};

const deleteDataOrder = (StationName, cb) => {
  // Delete the record from the database
  db.run(
    `DELETE FROM OrderDetails WHERE StationName = ?`,
    [StationName],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true });
      }
    }
  );
};

module.exports = {
  init,
  insertData,
  getData,
  updateData,
  deleteData,
  insertDataOrder,
  deleteDataOrder,
  getDataOrder,
  updateDataOrder,
  login,
};
