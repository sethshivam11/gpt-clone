import React, { useState } from "react";

const SignupModal = ({ register, setSignupModal, setLoginModal, setIsLoggedIn,  }) => {
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/api/v1/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        if (resData.success) {
          setIsLoggedIn(true);
          setSignupModal(false);
          localStorage.setItem("accessToken", resData.accessToken);
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
      open={register}
      className="z-20 top-1/3 p-8 rounded-lg backdrop-opacity-50"
    >
      <form onSubmit={handleLogin} className="flex flex-col gap-2 p-4 ">
        <input
          type="text"
          name="name"
          value={creds.name}
          onChange={handleChange}
          placeholder="Name"
          className="ring-2 ring-gray-200 rounded-md p-2"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={creds.email}
          placeholder="Email"
          className="ring-2 ring-gray-200 rounded-md p-2"
        />
        <input
          type="password"
          name="password"
          value={creds.password}
          onChange={handleChange}
          placeholder="Password"
          className="ring-2 ring-gray-200 rounded-md p-2"
        />
        <button type="submit" className="ring-2 ring-gray-400 rounded-md p-1">
          Signup
        </button>
        <button
          className="ring-2 ring-gray-400 rounded-md p-1"
          onClick={() => {
            setSignupModal(false);
            setLoginModal(true);
          }}
        >
          Login
        </button>
      </form>
    </dialog>
  );
};

export default SignupModal;
