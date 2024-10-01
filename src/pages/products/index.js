import Button from "@/components/atoms/Button";
import CardProduct from "@/components/molecules/CardProduct";
import React, { useState, useEffect } from "react";

const data = [
  {
    id: 1,
    image: "images/odeng.jpg",
    name: "Odeng 1",
    desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia provident vero commodi nulla accusantium consequuntur quibusdam aspernatur esse incidunt illo!",
    price: 25000,
  },
  {
    id: 2,
    image: "images/odeng.jpg",
    name: "Odeng 2",
    desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia provident vero commodi nulla accusantium consequuntur quibusdam aspernatur esse incidunt illo!",
    price: 25000,
  },
  {
    id: 3,
    image: "images/odeng.jpg",
    name: "Odeng 3",
    desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia provident vero commodi nulla accusantium consequuntur quibusdam aspernatur esse incidunt illo!",
    price: 25000,
  },
];

const ProductsPage = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    if (getUsername) {
      setUsername(getUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };
  return (
    <>
      <div className="flex justify-between items-center bg-blue-500 px-5 py-4">
        <h1 className="text-xl">Welcome, {username}</h1>
        <Button
          color="bg-red-500"
          textButton="Log Out"
          onClick={handleLogout}
        />
      </div>
      <div className="flex justify-center items-center min-h-screen gap-4">
        <CardProduct>
          <CardProduct.Header image={"images/odeng.jpg"} />
          <CardProduct.Body
            title={"Odeng"}
            desc={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia provident vero commodi nulla accusantium consequuntur quibusdam aspernatur esse incidunt illo!`}
          />
          <CardProduct.Footer price={"25.000"} />
        </CardProduct>

        {data.map((item) => (
          <CardProduct key={item.id}>
            <CardProduct.Header image={item.image} />
            <CardProduct.Body title={item.name} desc={item.desc} />
            <CardProduct.Footer price={item.price} />
          </CardProduct>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
