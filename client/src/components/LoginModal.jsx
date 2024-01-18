import React, { useState } from "react";

const LoginModal = ({ loginModal, setSignupModal, setLoginModal, setIsLoggedIn, fetchHistory }) => {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/api/v1/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((res) => res.json())
      .then((resData) => {
          console.log(resData)
        if(resData.success){
            setIsLoggedIn(true)
            setLoginModal(false)
            localStorage.setItem("accessToken", resData.accessToken);
            fetchHistory()
        }
      });
  };
  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <dialog
      open={loginModal}
      className="z-20 rounded-lg top-1/3 backdrop-blur-3xl"
    >
      <form onSubmit={handleLogin} className="flex flex-col p-8 gap-2">
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          value={creds.email}
          className="ring-2 ring-gray-200 rounded-md p-2"
        />
        <input
          type="password"
          name="password"
          value={creds.password}
          placeholder="Password"
          onChange={handleChange}
          className="ring-2 ring-gray-200 rounded-md p-2"
        />
        <button
          type="submit"
          className="border-2 border-solid border-gray-400 rounded-md p-1"
        >
          Login
        </button>
        <button
          className="border-2 border-solid border-gray-400 rounded-md p-1"
          onClick={() => {
            setSignupModal(true);
            setLoginModal(false);
          }}
        >
          Register
        </button>
      </form>
    </dialog>
  );
};

export default LoginModal;
