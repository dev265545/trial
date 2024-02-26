// In your Next.JS component (e.g., pages/index.js)
"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

const MyComponent = () => {
  const router = useRouter();
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
      <nav>
        <Navigation />
      </nav>{" "}
      <Table>
        <TableCaption>
          <div></div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Item Code</TableHead>
            <TableHead className="text-center">Item Name</TableHead>
            <TableHead className="text-center">Weight</TableHead>

            <TableHead className="text-center">Cubic Feet</TableHead>

            <TableHead className="text-center">Actions</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: any) => (
            <TableRow className="" key={item.Itemcode}>
              {" "}
              <TableCell>{item.Itemcode}</TableCell>
              <TableCell className=" text-center font-medium">
                {item.ItemName}
              </TableCell>
              <TableCell className="text-center">{item.Weight}</TableCell>
              <TableCell className="text-center">{item.cubicft}</TableCell>{" "}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyComponent;
