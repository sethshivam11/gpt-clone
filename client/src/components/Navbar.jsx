import React from "react";
import search from "../assets/search.svg";
import notification from "../assets/notification.svg"
import avatar from "../assets/avatar.svg"
import dropdown from "../assets/dropdown.svg"

const Navbar = () => {
  return (
    <div className="bg-[#1e1f26] w-full fixed ml-20 py-4 flex flex-row justify-center mr-24 items-center gap-6 z-10">
      <div className="border-solid border-2 border-gray-200 w-fit rounded-full flex text-white justify-center px-4 py-2">
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent p-0.5 mr-2 outline-none"
        />
        <button className="w-6" title="Search">
          <img src={search} alt="Search" className="contain" />
        </button>
      </div>
      <div className="pt-2 flex flex-row absolute right-24 gap-4">
        <button title="Notifications">
          <img src={notification} alt="" className="w-8" />
        </button>
        <button className="flex flex-row items-center" title="Profile">
          <img src={avatar} alt="" className="w-8" />
          <img src={dropdown} alt="" className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
