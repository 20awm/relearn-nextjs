import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputFrom";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <form className="flex flex-col gap-4">
      <InputForm
        label="Username"
        name="email"
        type="email"
        placeholder="Masukkan email"
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="Masukkan password"
      />
      <Button size={"w-full"} textButton="Login"></Button>
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
