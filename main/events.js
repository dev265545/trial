const { ipcMain } = require("electron");
const database = require("./database");

const init = (appWindow) => {
  //   ipcMain.on("userInput", (event, data) => {
  //     // Simulate some backend processing
  //     const processedData = `Processed: ${data.data}` + "mmmmmmmm888";

  //     // Send the processed data back to the renderer process
  //     appWindow.webContents.send("backendResponse", {
  //       message: processedData,
  //     });
  //   });

  ipcMain.on("addNewItem", (event, data) => {
    // Add a new item to the database
    database.insertData(data, (response) => {
      event.reply("crudResult", response);
    });
  });
  ipcMain.on("addNewItemOrder", (event, data) => {
    // Add a new item to the database
    database.insertDataOrder(data, (response) => {
      event.reply("crudResult", response);
    });
  });
  ipcMain.on("getDataOrder", (event) => {
    // Retrieve all items from the database
    database.getDataOrder(null, (response) => {
      if (!response.success) {
        event.reply("getDataOrderx", response);
      } else {
        event.reply("getDataOrderx", response);
      }
    });
  });

  ipcMain.on("getAllItems", (event) => {
    // Retrieve all items from the database
    database.getData(null, (response) => {
      if (!response.success) {
        event.reply("crudResult", response);
      } else {
        event.reply("getAllItemsx", response);
      }
    });
  });

  ipcMain.on("updateItem", (event, data) => {
    // Update an item in the database
    database.updateData(data, (response) => {
      event.reply("crudResult", response);
    });
  });

  ipcMain.on("deleteItem", (event, data) => {
    // Delete an item from the database
    database.deleteData(data.id, (response) => {
      event.reply("crudResult", response);
    });
  });
};

module.exports = {
  init,
};
