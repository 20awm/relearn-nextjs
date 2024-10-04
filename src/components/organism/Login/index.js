import React from "react";
import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputFrom";
// import Link from "next/link";
import { login } from "@/services/auth";

const Login = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("Login");
    const payload = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    try {
      const response = await login(payload);
      console.log(response);

      if (response.status) {
        localStorage.setItem("token", response.token);
        window.location.href = "/products";
      } else {
        console.log("Login failed", response);
      }
    } catch (error) {
      console.log(error);
    }
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
