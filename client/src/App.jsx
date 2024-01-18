import "./App.css";
import SideMenu from "./components/SideMenu";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Chats from "./components/Chats";
import { useCallback, useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

function App() {
  const [chats, setChats] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [prompt, setPrompt] = useState("");

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
    <main className="bg-[#0c1525]">
      {/* <SignupModal
        register={signupModal}
        setLoginModal={setLoginModal}
        setSignupModal={setSignupModal}
        setIsLoggedIn={setIsLoggedIn}
        fetchHistory={fetchHistory}
      /> */}

      {/* <LoginModal
        loginModal={loginModal}
        setSignupModal={setSignupModal}
        setLoginModal={setLoginModal}
        setIsLoggedIn={setIsLoggedIn}
        fetchHistory={fetchHistory}
      /> */}
      <Navbar loggedIn={isLoggedIn} />
      <SideMenu />
      <Chats
        chats={chats}
        setChats={setChats}
        prompt={prompt}
        setPrompt={setPrompt}
      />
      <List history={history} setChats={setChats} setPrompt={setPrompt} />
    </main>
  );
}

export default App;
