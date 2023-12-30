const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const fs = require("fs");
const path = require("path");

const sqlite3 = require("sqlite3").verbose();

// Get the user data directory
const userDataPath = app.getPath("userData");

// Set the path to the SQLite database file
const databasePath = path.join(__dirname, "database.db");
console.log(databasePath);

let db;

// Check if the database file exists

// Handle IPC messages for CRUD operations

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const userDataPath = app.getPath("userData");

  // Set the path to the SQLite database file
  const databasePath = path.join(userDataPath, "database.db");
  console.log(databasePath);

  if (fs.existsSync(databasePath)) {
    // If the database file exists, run your code here
    console.log("Database file exists. Running your code...");
    // Add your existing code for database operations here

    // ... rest of your code ...
  } else {
    // If the database file does not exist, create it and the required table
    console.log(
      "Database file does not exist. Creating the database and table..."
    );

    // Create a new database instance
    const db = new sqlite3.Database(databasePath);

    // Run a function to create the necessary table
    db.serialize(() => {
      db.run(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT
      )
    `);

      // ... any other initialization code ...

      // Close the database connection
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Database created and connection closed.");
      });
    });
  }
  db = new sqlite3.Database(databasePath);
  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
    ipcMain.on("userInput", (event, data) => {
      // Simulate some backend processing
      const processedData = `Processed: ${data.data}` + "mmmmmmmm888";

      // Send the processed data back to the renderer process
      win.webContents.send("backendResponse", {
        message: processedData,
      });
    });
    ipcMain.on("addNewItem", (event, data) => {
      // Add a new item to the database
      const { name, description } = data;
      db.run(
        "INSERT INTO items (name, description) VALUES (?, ?)",
        [name, description],
        (err) => {
          if (err) {
            event.reply("crudResult", {
              success: false,
              error: err.message,
            });
          } else {
            event.reply("crudResult", { success: true });
          }
        }
      );
    });

    ipcMain.on("getAllItems", (event) => {
      // Retrieve all items from the database

      db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
          event.reply("crudResult", { success: false, error: err.message });
        } else {
          win.webContents.send("getAllItemsx", {
            data: rows,
          });
        }
      });
    });

    ipcMain.on("updateItem", (event, data) => {
      // Update an item in the database
      const { id, name, description } = data;
      db.run(
        "UPDATE items SET name = ?, description = ? WHERE id = ?",
        [name, description, id],
        (err) => {
          if (err) {
            event.reply("crudResult", {
              success: false,
              error: err.message,
            });
          } else {
            event.reply("crudResult", { success: true });
          }
        }
      );
    });

    ipcMain.on("deleteItem", (event, data) => {
      // Delete an item from the database
      const { id } = data;
      db.run("DELETE FROM items WHERE id = ?", [id], (err) => {
        if (err) {
          event.reply("crudResult", { success: false, error: err.message });
        } else {
          event.reply("crudResult", { success: true });
        }
      });
    });
  }
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
