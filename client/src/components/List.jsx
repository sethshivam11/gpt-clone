import React from "react";
import chat from "../assets/chat.svg";
import newChat from "../assets/new.svg";
import clear from "../assets/clear.svg";

const List = ({ history, setChats, setPrompt }) => {
  return (
    <div className="text-white w-1/4 h-screen ml-20 pt-20 flex flex-col items-center border-solid border-r-2 border-gray-800 z-10">
      <h3 className="text-2xl font-bold my-4">Text Generator</h3>
      <ul className="overflow-y-scroll h-4/5 no-scrollbar p-1">
        {history?.map((chats) => {
          return (
            <li
              className="ring-2 ring-gray-600 rounded-full my-4"
              key={chats.chats[0].split(";")[1].replace("time: ", "")}
            >
              <button
                className="flex flex-row gap-2 my-1 w-72 py-2 px-4 truncate"
                onClick={() => {
                  // setChats(() => []);
                  setChats(() => chats.chats);
                }}
              >
                <img src={chat} alt="" className="w-4 pt-1 contain" />
                <span className="truncate">
                  {chats.chats[0].split(";")[0].replace("prompt: ", "")}
                </span>
              </button>
            </li>
          );
        })}
        <li className="ring-2 ring-gray-600 rounded-full my-4">
          <button className="flex flex-row gap-2 my-1 w-72 py-2 px-4 truncate">
            <img src={chat} alt="" className="w-4 pt-1 contain" />
            <span className="truncate">Description 0</span>
          </button>
        </li>
        <li className="ring-2 ring-gray-600 rounded-full my-4">
          <button className="flex flex-row gap-2 my-1 w-72 py-2 px-4 truncate">
            <img src={chat} alt="" className="w-4 pt-1 contain" />
            <span className="truncate">Description 1</span>
          </button>
        </li>
      </ul>
      <ul>
        <li className="ring-2 ring-green-600 text-green-600 rounded-full my-4">
          <button
            className="flex flex-row gap-2 my-1 w-72 py-2 px-4"
            onClick={() => setChats([])}
          >
            <img src={newChat} alt="" className="w-4 pt-1 contain" />
            <span className="truncate">New Chat</span>
          </button>
        </li>
        <li className="ring-2 ring-red-600 text-red-600 rounded-full my-4">
          <button
            className="flex flex-row gap-2 my-1 w-72 py-2 px-4"
            onClick={() => setPrompt("")}
          >
            <img src={clear} alt="" className="w-4 pt-1 contain" />
            <span className="truncate">Clear Conversation</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default List;
