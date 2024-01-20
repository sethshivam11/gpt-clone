import "./App.css";
import SideMenu from "./components/SideMenu";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Chats from "./components/Chats";
import { useCallback, useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [prompt, setPrompt] = useState("");
  const [command, setCommand] = useState("text");
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const fetchHistory = useCallback(() => {
    fetch("/api/v1/chats/history", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setHistory(resData.chats);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setHistory]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoggedIn(false);
      setLoginModal(true);
    } else {
      setIsLoggedIn(true);
      fetchHistory();
    }
  }, []);

  return (
    <main className="bg-[#0c1525] dark">
      <Toaster position="bottom-center" />
      <SignupModal
        register={signupModal}
        setLoginModal={setLoginModal}
        setSignupModal={setSignupModal}
        setIsLoggedIn={setIsLoggedIn}
        fetchHistory={fetchHistory}
      />
      <LoginModal
        loginModal={loginModal}
        setSignupModal={setSignupModal}
        setLoginModal={setLoginModal}
        setIsLoggedIn={setIsLoggedIn}
        fetchHistory={fetchHistory}
      />
      <Navbar loggedIn={isLoggedIn} />
      <SideMenu
        setLoginModal={setLoginModal}
        setIsLoggedIn={setIsLoggedIn}
        setCommand={setCommand}
        command={command}
        setHistory={setHistory}
        chatId={chatId}
        toast={toast}
      />
      <Chats
        chats={chats}
        setChats={setChats}
        prompt={prompt}
        setPrompt={setPrompt}
        command={command}
        chatId={chatId}
        setHistory={setHistory}
        history={history}
        setChatId={setChatId}
      />
      <List
        history={history}
        setChatId={setChatId}
        setChats={setChats}
        setPrompt={setPrompt}
      />
    </main>
  );
}

export default App;
