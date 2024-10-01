import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputFrom";
// import Link from "next/link";
import React from "react";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    // console.log("Login");
    console.log(event.target.username.value);
    console.log(event.target.password.value);
    localStorage.setItem("username", event.target.username.value);
    localStorage.setItem("password", event.target.password.value);
    window.location.href = "/products";
  };
  
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <InputForm
        label="Username"
        name="username"
        type="text"
        placeholder="Masukkan nama"
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="Masukkan password"
      />
      <Button size={"w-full"} textButton="Login" type={"submit"}></Button>
      {/* <p className="text-sm text-center mt-2">
        {`Don't have an account? `}
        <Link href="/register" className="text-blue-500 hover:text-blue-700">
          Register
        </Link>
      </p> */}
    </form>
  );
};

export default Login;
