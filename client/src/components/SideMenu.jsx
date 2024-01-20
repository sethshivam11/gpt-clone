import React from "react";
import logo from "../assets/logo.png";
import box from "../assets/box.svg";
import chat from "../assets/chat.svg";
import audio from "../assets/audio.svg";
import image from "../assets/image.svg";
import saved from "../assets/saved.svg";
import stock from "../assets/stock.svg";
import logout from "../assets/logout.svg";

const SideMenu = ({
  setIsLoggedIn,
  setLoginModal,
  setCommand,
  chatId,
  command,
  toast,
}) => {
  const handleLogOut = () => {
    fetch("/api/v1/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          localStorage.removeItem("accessToken");
          setIsLoggedIn(false);
          setLoginModal(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSave = () => {
    if (!chatId) {
      toast("Select a chat to save!");
      return;
    }
    const toastPromise = toast.loading("Saving chat");
    fetch(`/api/v1/chats/save/${chatId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        toast.dismiss(toastPromise);
        if (resData.success) {
          toast.success(resData.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(toastPromise)
        toast.error("Some error occured")
      });
  };
  return (
    <div className="flex flex-col fixed items-center p-2 bg-[#1a2232] h-screen w-20 text-white">
      <img src={logo} alt="Logo" className="w-12 h-12" />
      <span className="font-bold text-md">LOGO.</span>
      <ul className="mt-10 p-2">
        <li>
          <button
            className="my-4 w-6"
            title="Text"
            onClick={() => setCommand("text")}
          >
            <img
              src={chat}
              alt=""
              className={`contain ${command === "text" ? "sepia" : ""}`}
            />
          </button>
        </li>
        <li>
          <button
            className="my-4 w-6"
            title="Image"
            onClick={() => setCommand("image")}
          >
            <img
              src={image}
              alt=""
              className={`contain ${command === "image" ? "sepia" : ""}`}
            />
          </button>
        </li>
        <li>
          <button
            className="my-4 w-6"
            title="Audio"
            onClick={() => setCommand("audio")}
          >
            <img
              src={audio}
              alt=""
              className={`contain ${command === "audio" ? "sepia" : ""}`}
            />
          </button>
        </li>
        <li>
          <button
            className="my-4 w-6"
            title="Saved"
            onClick={() => handleSave()}
          >
            <img src={saved} alt="" className="contain" />
          </button>
        </li>
        <li>
          <button
            className="my-4 w-6"
            title="Logout"
            onClick={() => handleLogOut()}
          >
            <img src={logout} alt="" className="contain" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
