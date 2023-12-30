// In your Next.JS component (e.g., pages/index.js)
"use client";
import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else {
      setDescription(value);
    }
  };

  const handleAddItem = () => {
    // Sending data to add a new item to the main process
    window.electronAPI.send("addNewItem", { name, description });
    window.electronAPI.on("crudResult", (event, data) => {
      console.log(data);
    });

    getAllDataItems();
  };

  // const handleGetAllItems = () => {
  //   window.electronAPI.send("getAllItems");
  // };

  // useEffect(() => {
  //   const handleGetAllItemsResult = (event, data) => {
  //     if (data.success) {
  //       setItems(data.data);
  //     } else {
  //       console.error("Get All Items Error:", data.error);
  //     }
  //   };

  //   window.electronAPI.on("getAllItemsResult", handleGetAllItemsResult);

  //   // Cleanup: Remove the event listener when the component is unmounted
  //   return () => {
  //     // window.electronAPI.removeAllListeners("getAllItemsResult");
  //   };
  // }, []); // Empty dependency array to run the effect only once
  // const handleSubmit = () => {
  //   // Sending user input to the main process
  //   window.electronAPI.send("getAllItemsx");
  // };
  const getAllDataItems = () => {
    window.electronAPI.send("getAllItems");
    window.electronAPI.on("getAllItemsx", (event, data) => {
      setItems(data.data);
    });
  };

  useEffect(() => {
    getAllDataItems();
  }, []);
  console.log(items);

  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          className="text-black"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          className="text-black"
          onChange={handleInputChange}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <div>
        <h2>Items</h2>
        <ul>
          {items.map((item: any) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyComponent;
