"use client";
import Navigation from "@/components/Navigation";
import NewOrderModal from "@/components/NewOrderModal";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const Orders = () => {
  const [openModal, setOpenModal] = useState(false);
  const [orders, setOrders] = useState([]);

  const getAllDataItems = () => {
    // Check if window object is defined (client side)
    if (typeof window !== "undefined") {
      window.electronAPI.send("getDataOrder");
      window.electronAPI.on("getDataOrderx", (event, data) => {
        setOrders(data.data);
        console.log(data.data);
      });
    }
  };

  useEffect(() => {
    getAllDataItems();
  }, []);

  console.log(orders);
  const ModalOperation = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="flex flex-col ">
      {openModal && <NewOrderModal ModalOperation={ModalOperation} />}
      <nav>
        <Navigation />
      </nav>{" "}
      <div className="flex flex-col">
        <div className="p-2  font-extrabold text-3xl">Orders</div>
        <div className="p-2 rounded-xl">
          <div
            onClick={() => {
              ModalOperation();
            }}
            className="p-2 wavy w-[250px] h-[150px] rounded-xl flex "
          >
            <div className="font-bold text-2xl">Add New Order</div>
            <IoIosAddCircleOutline className="text-5xl font-extrabold  mr-2 mb-2 " />
          </div>
        </div>
        <div className="flex flex-colZ">
          {orders.map((order: any, index) => (
            <div key={index}>
              <div className="p-2 rounded-xl">
                <div className="p-2 wavy w-[250px] h-[150px] rounded-xl ">
                  <div className="font-bold text-2xl">{order.StationName}</div>
                  <div className="font-bold text-2xl">{order.PartyName}</div>
                  <IoIosAddCircleOutline className="text-5xl font-extrabold mr-2 mb-2 " />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default Orders;
