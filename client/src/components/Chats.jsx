import React from "react";
import clip from "../assets/clip.svg";
import voice from "../assets/voice.svg";
import send from "../assets/send.svg";

const Chats = ({
  chats,
  setChats,
  chatId,
  setChatId,
  command,
  prompt,
  setPrompt,
  setHistory,
  history,
}) => {
  const handleSend = () => {
    if (prompt.length === 0) return;
    fetch(`/api/v1/chats/${command}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ prompt, chatId }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          const dt = new Date();
          switch (command) {
            case "text":
              setChats([
                ...chats,
                `prompt: ${prompt};time: ${resData.time}`,
                `reply: ${resData.reply};time: ${resData.time}`,
              ]);
              if (!chatId.length) {
                setHistory([...history, resData.chat]);
                setChatId(resData.chat._id);
              }
              setChatId(resData.chatId);
              setPrompt("");
              break;
            case "audio":
              setChats([
                `prompt: ${prompt};time: ${dt.toUTCString()}`,
                `reply: ${resData.audio};time: ${dt.toUTCString()}`,
              ]);
              break;
            case "image":
              setChats([
                `prompt: ${prompt};time: ${dt.toUTCString()}`,
                `reply: ${resData.image};time: ${dt.toUTCString()}`,
              ]);
              break;
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const handleVoice = () => {
    console.log("Voice");
  };
  const handleClip = () => {
    console.log("File");
  };
  return (
    <div className="w-3/4 text-white right-0 top-0 absolute ml-20 pl-20 flex items-center">
      <div className="p-4 h-screen pt-20 w-full">
        <ul className="overflow-y-scroll h-5/6 w-full p-1 no-scrollbar pb-2">
          {chats.length > 0 &&
            chats?.map((chat, index) => {
              return (
                <li
                  className={`max-w-4/5 w-fit clear-both ${
                    chat.includes("prompt") ? "float-right" : "float-left"
                  }`}
                  key={index}
                >
                  <span className="text-sm text-gray-400 mb-1">
                    {chat
                      ?.split(";")[1]
                      .replace("time: ", "")
                      .replace("GMT", "")
                      .slice(4, -4)}
                  </span>
                  <div className="text-gray-300 border-solid border-2 border-gray-600 rounded-lg p-2">
                    {chat.includes("prompt: ")
                      ? chat?.split(";")[0].replace("prompt: ", "")
                      : chat?.split(";")[0].replace("reply: ", "")}
                  </div>
                </li>
              );
            })}
        </ul>
        <div className="h-1/6 flex items-center justify-center p-4">
          <div className="flex flex-row items-center ring-2 ring-gray-200 p-2 rounded-lg gap-2 w-full">
            <button title="File" onClick={() => handleClip()}>
              <img src={clip} alt="" className="contain w-6" />
            </button>
            <input
              type="text"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Send a message"
              className="outline-none bg-transparent w-full pl-4 text-white"
              autoComplete="none"
            />
            <button className="" title="Voice" onClick={() => handleVoice()}>
              <img src={voice} alt="" className="contain w-8" />
            </button>
            <button className="" title="Send" onClick={() => handleSend()}>
              <img src={send} alt="" className="contain w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
