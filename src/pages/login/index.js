import Login from "@/components/organism/Login";
import AuthLayout from "@/components/templates/AuthLayout";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <AuthLayout title={"Login"} desc={"Login to your account"} type="login">
          <Login />
        </AuthLayout>
      </div>
    </>
  );
};

export default LoginPage;
