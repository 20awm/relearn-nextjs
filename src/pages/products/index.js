import Button from "@/components/atoms/Button";
import CardProduct from "@/components/molecules/CardProduct";
import React, { useState, useEffect, useRef } from "react";

const data = [
  {
    id: 1,
    image: "images/odeng.jpg",
    name: "Odeng 1",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor officia quia non cupiditate commodi maxime architecto tempora hic iste sapiente?",
    price: 25000,
  },
  {
    id: 2,
    image: "images/odeng.jpg",
    name: "Odeng 2",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor officia quia non cupiditate commodi maxime architecto tempora hic iste sapiente?",
    price: 25000,
  },
  {
    id: 3,
    image: "images/odeng.jpg",
    name: "Odeng 3",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor officia quia non cupiditate commodi maxime architecto tempora hic iste sapiente?",
    price: 25000,
  },
];

function ProductsPage() {
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    if (getUsername) {
      setUsername(getUsername);
    }
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    searchInputRef.current.focus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((total, item) => {
        const product = data.find((product) => product.id === item.id);
        return total + product.price * item.qty;
      }, 0);
      setTotal(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center bg-blue-500 px-5 py-4">
        <h1 className="text-xl">Welcome, {username}</h1>
        <Button color="bg-red-500" textButton="Logout" onClick={handleLogout} />
      </div>
      <div className="flex px-5 py-4">
        <div className="flex flex-col w-2/3">
          <h1 className="text-3xl font-bold mb-2 uppercase">Products</h1>
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a product"
            className="mb-4 p-2 border border-gray-300"
          />
          <div className="flex flex-wrap gap-4">
            {filteredProducts.map((item) => (
              <CardProduct key={item.id}>
                <CardProduct.Header image={item.image} />
                <CardProduct.Body title={item.name} desc={item.desc} />
                <CardProduct.Footer
                  price={item.price}
                  onClick={() => handleAddToCart(item.id)}
                />
              </CardProduct>
            ))}
          </div>
        </div>
        {/* cart */}
        {cart.length > 0 && (
          <div className="cart w-1/3">
            <h1 className="text-3xl font-bold mb-2 uppercase">Cart</h1>
            <div className="flex flex-col gap-2">
              {cart.map((item) => {
                const datas = data.find((data) => data.id === item.id);
                return (
                  <div key={item.id} className="flex p-4 border rounded-lg">
                    <img
                      src={datas.image}
                      alt="cart item"
                      className="max-w-[100px]"
                    />
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col justify-between ml-3">
                        <span className="font-bold text-xl">{datas.name}</span>
                        <span className="font-semibold">
                          {(datas.price * item.qty).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <span className="mb-1">Qty</span>
                        <span className="flex-justify-center items-center font-semibold p-2 border rounded-sm text-center w-10 h-10">
                          {item.qty}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between px-4 py-2 border mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                {total.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsPage;
