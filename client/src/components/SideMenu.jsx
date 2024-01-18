import React from "react";
import logo from "../assets/logo.png";
import box from "../assets/box.svg";
import chat from "../assets/chat.svg";
import audio from "../assets/audio.svg";
import image from "../assets/image.svg";
import saved from "../assets/saved.svg";
import stock from "../assets/stock.svg";
import logout from "../assets/logout.svg";

const SideMenu = () => {
  return (
    <div className="flex flex-col fixed items-center p-2 bg-[#1a2232] h-screen w-20 text-white">
      <img src={logo} alt="Logo" className="w-12 h-12" />
      <span className="font-bold text-md">LOGO.</span>
      <ul className="mt-10 p-2">
        <li>
          <button className="my-4 w-6" title="Options">
            <img src={box} alt="" className="contain" />
          </button>
        </li>
        <li>
          <button className="my-4 w-6" title="Trends">
            <img src={stock} alt="" className="contain" />
          </button>
        </li>
        <li>
          <button className="my-4 w-6" title="Text">
            <img src={chat} alt="" className="contain" />
          </button>
        </li>
        <li>
          <button className="my-4 w-6" title="Image">
            <img src={image} alt="" className="contain" />
          </button>
        </li>
        <li>
          <button className="my-4 w-6" title="Audio">
            <img src={audio} alt="" className="contain" />
          </button>
        </li>
        <li>
          <button className="my-4 w-6" title="Saved">
            <img src={saved} alt="" className="contain" />
          </button>
        </li>
        <li>
          <button className="my-4 w-6" title="Logout">
            <img src={logout} alt="" className="contain" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
