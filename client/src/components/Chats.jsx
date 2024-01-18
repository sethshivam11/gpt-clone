import React from "react";
import clip from "../assets/clip.svg";
import voice from "../assets/voice.svg";
import send from "../assets/send.svg";

const Chats = ({ chats, setChats }) => {
  return (
    <div className="w-3/4 text-white right-0 top-0 absolute ml-20 pl-20 flex items-center">
      <div className="p-4 h-screen pt-20 w-full">
        <ul className="overflow-y-scroll h-5/6 w-full p-1 no-scrollbar">
          {chats?.map((chat) => {
            return (
              <li
                className={`max-w-4/5 w-fit clear-both ${
                  chat.includes("prompt") ? "float-right" : "float-left"
                }`}
                key={chat.split(";")[1].replace("time: ", "")}
              >
                <span className="text-sm text-gray-400 mb-1">
                  {chat?.split(";")[1].replace("time: ", "").replace("GMT", "")}
                </span>
                <div className="text-gray-300 border-solid border-2 border-gray-600 rounded-lg p-2">
                  {chat.includes("prompt: ")
                    ? chat?.split(";")[0].replace("prompt: ", "")
                    : chat?.split(";")[0].replace("reply: ", "")}
                </div>
              </li>
            );
          })}
          <li
            className="w-4/5 float-right"
          >
            <span className="text-sm text-gray-400 mb-1">
              Nov 18, 12:05
            </span>
            <div className="text-gray-300 border-solid border-2 border-gray-600 rounded-lg p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi illum temporibus quibusdam saepe nemo necessitatibus perspiciatis deleniti nobis et voluptatum illo perferendis quae delectus, quo, quisquam eligendi aliquid? Modi, nihil!
            </div>
          </li>
          <li
            className="w-4/5 float-left"
          >
            <span className="text-sm text-gray-400 mb-1">
              Nov 18, 12:06
            </span>
            <div className="text-gray-300 border-solid border-2 border-gray-600 rounded-lg p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi illum temporibus quibusdam saepe nemo necessitatibus perspiciatis deleniti nobis et voluptatum illo perferendis quae delectus, quo, quisquam eligendi aliquid? Modi, nihil!
            </div>
          </li>
          <li
            className="w-4/5 float-right"
          >
            <span className="text-sm text-gray-400 mb-1">
              Nov 18, 12:07
            </span>
            <div className="text-gray-300 border-solid border-2 border-gray-600 rounded-lg p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi illum temporibus quibusdam saepe nemo necessitatibus perspiciatis deleniti
            </div>
          </li>
          <li
            className="w-4/5 float-left"
          >
            <span className="text-sm text-gray-400 mb-1">
              Nov 18, 12:08
            </span>
            <div className="text-gray-300 border-solid border-2 border-gray-600 rounded-lg p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi illum temporibus quibusdam saepe nemo necessitatibus perspiciatis deleniti nobis et
            </div>
          </li>
        </ul>
        <div className="h-1/6 flex items-center justify-center p-4">
          <div className="flex flex-row items-center ring-2 ring-gray-200 p-2 rounded-lg gap-2 w-full">
            <button title="File">
              <img src={clip} alt="" className="contain w-6" />
            </button>
            <input
              type="text"
              placeholder="Send a message"
              className="outline-none bg-transparent w-full pl-4"
            />
            <button className="" title="Voice">
              <img src={voice} alt="" className="contain w-8" />
            </button>
            <button className="" title="Send">
              <img src={send} alt="" className="contain w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
