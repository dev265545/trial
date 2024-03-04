import React, { useEffect, useState } from "react";
import DropDownBuilder from "./DropDownBuilder";
import { ModalOperation } from "../app/Orders/page";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FaEdit } from "react-icons/fa";

export type Item = {
  Itemcode: string;
  ItemName: string;
  Weight: number;
  cubicft: number;
  quantity: number;
};
export type NewOrderModalProps = {
  ModalOperation: ModalOperation;
};
export type Order = {
  StationName: string;
  SerialNo: string;
  PartyName: string;
  Date: string;
  TotalQuantity: number;
  TotalCubicFeet: number;
  TotalFeet: number;
  ItemsArray: Item[];
};
const NewOrderModal = ({ ModalOperation }: NewOrderModalProps) => {
  const [name, setName] = useState<string>();
  const [SNO, setSNO] = useState<string>();
  const [date, setDate] = useState<string>();
  const [partyName, setPartyName] = useState<string>();
  const [items, setItems] = useState<Item[]>([]);
  const [Orderitems, setOrderItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>();
  const [quantity, setQuantity] = useState(0);
  const [Itemcode, setItemCode] = useState<string>();
  const [editQuantityIndex, setEditQuantityIndex] = useState(10000);
  const [editModal, setEditModal] = useState(false);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = {
      StationName: name,
      SerialNo: SNO,
      PartyName: partyName,
      Date: date,
      TotalQuantity: total.quantity,
      TotalCubicFeet: total.cubicft,
      TotalFeet: total.feet,
      ItemsArray: Orderitems,
    };
    window.electronAPI.send("addNewItemOrder", payload);
    window.electronAPI.on("crudResult", (event, data) => {
      console.log(data);
    });
    ModalOperation();
  };
  const handleItemCode = (value: string) => {
    setItemCode(value);
  };
  const getAllDataItems = () => {
    window.electronAPI.send("getAllItems");
    window.electronAPI.on("getAllItemsx", (event, data) => {
      setItems(data.data);
    });
    console.log(items, "s");
  };
  const handleAddItem = () => {
    const filterdata: Item = items.filter(
      (item: Item) => item.Itemcode === Itemcode
    )[0];
    console.log(filterdata);
    console.log(quantity);
    const newData: Item = {
      Itemcode: Itemcode != undefined ? Itemcode : "",
      ItemName: filterdata.ItemName,
      Weight: filterdata.Weight,
      cubicft: filterdata.cubicft,
      quantity: parseInt(String(quantity), 10),
    };

    console.log(newData);

    setOrderItems((prevArray: Item[]) => [...prevArray, newData]);
  };
  useEffect(() => {
    console.log("xx", Orderitems); // This will log the updated Orderitems
  }, [Orderitems]); // Run the effect when Orderitems changes

  useEffect(() => {
    getAllDataItems();
  }, []);
  console.log(items);
  const total = Orderitems.reduce(
    (accumulator, currentItem) => {
      accumulator.cubicft += currentItem.cubicft;
      accumulator.quantity += currentItem.quantity;
      accumulator.feet += currentItem.cubicft * currentItem.quantity;
      return accumulator;
    },
    { cubicft: 0, quantity: 0, feet: 0 }
  );
  const handleDeleteItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setOrderItems((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(index, 1);
      return newArray;
    });
  };
  const [newQuantity, setNewQuantity] = useState(0);
  const handleEditQuantity = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    newQuantity: number
  ) => {
    e.preventDefault();
    setOrderItems((prevArray) => {
      const newArray = [...prevArray];
      if (newArray[index]?.quantity !== undefined) {
        newArray[index].quantity = newQuantity;
      }
      return newArray;
    });
    setEditQuantityIndex(10000);
  };

  console.log(total);

  return (
    <div className=" absolute shadow-2xl border border-gray-300  top-[100px] rounded-xl left-[250px]   z-100 justify-center items-center ">
      <div className="relative p-4  w-[1200px]  h-full md:h-auto">
        <div className="relative p-4  bg-primary-foreground rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              New Order Slip
            </h3>
            <button
              type="button"
              onClick={() => {
                ModalOperation();
              }}
              // onClick={(e) => ModalOperation()}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="updateProductModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  //   fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  //   clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Station Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Station Name Ex - Delhi"
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Serial No.
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSNO(e.target.value);
                  }}
                  value={SNO}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Serial Number"
                />
              </div>
              <div>
                <label
                  htmlFor="partyName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Party Name
                </label>
                <input
                  type="text"
                  value={partyName}
                  name="partyName"
                  id="partyName"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPartyName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={"Order Placed by Party"}
                />
              </div>
              <div>
                <label
                  htmlFor="Date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDate(e.target.value);
                  }}
                  name="Date"
                  id="Date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <hr></hr>
              <hr></hr>

              <div className="flex flex-row gap-10">
                <div>
                  <label
                    htmlFor="ItemSelection"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an Item
                  </label>
                  <DropDownBuilder
                    items={items}
                    ItemCode={Itemcode != undefined ? Itemcode : ""}
                    handleItemCode={handleItemCode}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Quantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    name="quantity"
                    id="quantity"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setQuantity(parseInt(e.target.value));
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Quantity"
                  />
                </div>
                <div className="pt-7">
                  <button
                    onClick={() => {
                      handleAddItem();
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write a description..."
                >
                  Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7
                  processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory,
                  Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD
                  storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US
                </textarea>
              </div> */}
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                      ItemCode
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ItemName
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cubic Feet
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                      Feet
                    </th>
                    {/* <th scope="col" className="px-6 py-3 rounded-e-lg">
                      Price
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {Orderitems?.map((item: Item, index: number) => (
                    <tr className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.Itemcode}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.ItemName}
                      </th>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">{item.cubicft}</td>
                      <td className="px-6 py-4">
                        {item.cubicft * item.quantity}
                      </td>
                      <td className="px-6 py-4">
                        <Popover>
                          <PopoverTrigger className=" text-center ">
                            <FaEdit className="text-lg" />
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                  Edit Item
                                </h4>
                                <p className="text-sm text-muted-foreground"></p>
                              </div>
                              <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="width">ItemCode</Label>
                                  <Input
                                    onChange={(e) =>
                                      setNewQuantity(parseInt(e.target.value))
                                    }
                                    id="width"
                                    type="number"
                                    name="Itemcode"
                                    defaultValue={item.quantity}
                                    className="col-span-2 h-8"
                                  />
                                </div>

                                <Button
                                  onClick={(e) =>
                                    handleEditQuantity(e, index, newQuantity)
                                  }
                                  variant="default"
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <button
                          onClick={(e) => handleDeleteItem(e, index)}
                          className="text-red-600 ml-2 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="font-semibold text-gray-900 dark:text-white">
                    <th scope="row" className="px-6 py-3 text-base">
                      Total
                    </th>
                    <td className="px-6 py-3">{}</td>
                    <td className="px-6 py-3">
                      Total Quantity : {total.quantity}
                    </td>
                    <td className="px-6 py-3">
                      {" "}
                      Total CubicFeet : {Number(total.cubicft.toFixed(2))}
                    </td>
                    <td className="px-6 py-3">
                      {" "}
                      Total Feet : {Number(total.feet.toFixed(2))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <hr></hr>
            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
              {/* <button
                type="button"
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    // fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    // clip-rule="evenodd"
                  ></path>
                </svg>
                Delete
              </button> */}
            </div>
          </form>
        </div>
      </div>
      {editModal && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          aria-hidden="true"
          className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Quantity
                </h3>
              </div>

              <label htmlFor="newQuantity">Enter new quantity:</label>
              <input
                type="number"
                id="newQuantity"
                value={newQuantity}
                onChange={(e) => {
                  setNewQuantity(parseInt(e.target.value, 10));
                }}
              />

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="static-modal"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditQuantity(e, editQuantityIndex, newQuantity);
                    setEditModal(!editModal);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrderModal;
