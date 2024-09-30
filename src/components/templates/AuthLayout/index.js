import React from "react";

const AuthLayout = ({ title, desc, children }) => {
  return (
    <>
      <div className="rounded-lg bg-gradient-to-r from-violet-500 via-blue-500 to bg-sky-600 p-1 shadow-xl">
        <div className="max-w-xs border rounded-lg p-8 bg-white">
          <h1 className="text-3xl font-bold mb-2 text-blue-500">{title}</h1>
          <p className="font-medium text-slate-500 mb-4">{desc}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
