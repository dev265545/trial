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
import { Item } from "@/components/NewOrderModal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const MyComponent = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [newData, setnewData] = useState({
    Itemcode: "",
    ItemName: "",
    Weight: 0,
    cubicft: 0,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setnewData(
      (prevData: {
        Itemcode: string;
        ItemName: string;
        Weight: number;
        cubicft: number;
      }) => ({
        ...prevData,
        [name]: value,
      })
    );
    console.log(newData);
  };
  useEffect(() => console.log(newData), [newData]);

  const [updateData, setupdateData] = useState({
    Itemcode: "",
    ItemName: "",
    Weight: 0,
    cubicft: 0,
    oldItemcode: "",
  });
  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setupdateData(
      (prevData: {
        Itemcode: string;
        ItemName: string;
        Weight: number;
        cubicft: number;
        oldItemcode: string;
      }) => ({
        ...prevData,
        [name]: value,
      })
    );
    console.log(updateData);
  };
  const handleUpdateItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Sending data to add a new item to the main process
    console.log(updateData);
    window.electronAPI.send("updateItem", updateData);
    window.electronAPI.on("crudResult", (event, data) => {
      console.log(data);
    });
    setnewData({ Itemcode: "", ItemName: "", Weight: 0, cubicft: 0 });
    getAllDataItems();
  };
  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Sending data to add a new item to the main process
    console.log(newData);
    window.electronAPI.send("addNewItem", newData);
    window.electronAPI.on("crudResult", (event, data) => {
      console.log(data);
    });
    setnewData({ Itemcode: "", ItemName: "", Weight: 0, cubicft: 0 });
    getAllDataItems();
  };
  const deleteItem = (
    event: React.MouseEvent<HTMLButtonElement>,
    Itemcode: string
  ) => {
    event.preventDefault();
    console.log("c");
    window.electronAPI.send("deleteItem", Itemcode);
    window.electronAPI.on("crudResult", (event, data) => {
      console.log(data);
      getAllDataItems();
    });
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
    <main>
      <nav>
        <Navigation />
      </nav>
      {/* <div className="p-4 mt-5 mb-5 text-2xl flex justify-center items-center">
          Inventory
        </div> */}
      <Table>
        <TableCaption>
          <Popover>
            <PopoverTrigger>
              <Button variant="default">Add Item</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Add a New Item</h4>
                  <p className="text-sm text-muted-foreground"></p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">ItemCode</Label>
                    <Input
                      onChange={(e) => handleInputChange(e)}
                      id="width"
                      name="Itemcode"
                      defaultValue={newData.Itemcode}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Item Name</Label>
                    <Input
                      onChange={(e) => handleInputChange(e)}
                      id="maxWidth"
                      name="ItemName"
                      defaultValue={newData.ItemName}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Weight</Label>
                    <Input
                      onChange={(e) => handleInputChange(e)}
                      id="height"
                      name="Weight"
                      defaultValue={newData.Weight}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Cubic Feet</Label>
                    <Input
                      onChange={(e) => handleInputChange(e)}
                      id="maxHeight"
                      name="cubicft"
                      defaultValue={newData.cubicft}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <Button onClick={(e) => handleAddItem(e)} variant="default">
                    Submit
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead className="">Item Code</TableHead>
            <TableHead className="text-center">Item Name</TableHead>
            <TableHead className="text-center">Weight</TableHead>

            <TableHead className="text-center">Cubic Feet</TableHead>

            <TableHead className="text-center">Actions</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: Item) => (
            <TableRow className=" " key={item.Itemcode}>
              {" "}
              <TableCell>{item.Itemcode}</TableCell>
              <TableCell className=" text-center font-medium">
                {item.ItemName}
              </TableCell>
              <TableCell className="text-center">{item.Weight}</TableCell>
              <TableCell className="text-center">{item.cubicft}</TableCell>{" "}
              <TableCell className="text-center">
                <Popover>
                  <PopoverTrigger
                    onClick={() => {
                      setupdateData({
                        Itemcode: item.Itemcode,
                        ItemName: item.ItemName,
                        Weight: item.Weight,
                        cubicft: item.cubicft,
                        oldItemcode: item.Itemcode,
                      });
                    }}
                    className=" text-center "
                  >
                    <FaEdit className="text-lg" />
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Edit Item</h4>
                        <p className="text-sm text-muted-foreground"></p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">ItemCode</Label>
                          <Input
                            onChange={(e) => handleUpdateChange(e)}
                            id="width"
                            name="Itemcode"
                            defaultValue={item.Itemcode}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="maxWidth">Item Name</Label>
                          <Input
                            onChange={(e) => handleUpdateChange(e)}
                            id="maxWidth"
                            name="ItemName"
                            defaultValue={item.ItemName}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="height">Weight</Label>
                          <Input
                            onChange={(e) => handleUpdateChange(e)}
                            id="height"
                            name="Weight"
                            defaultValue={item.Weight}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="maxHeight">Cubic Feet</Label>
                          <Input
                            onChange={(e) => handleUpdateChange(e)}
                            id="maxHeight"
                            name="cubicft"
                            defaultValue={item.cubicft}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <Button
                          onClick={(e) => handleUpdateItem(e)}
                          variant="default"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <button onClick={(e) => deleteItem(e, item.Itemcode)}>
                  <MdDelete className="text-lg" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default MyComponent;
