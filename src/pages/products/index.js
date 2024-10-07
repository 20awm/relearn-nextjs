import Button from "@/components/atoms/Button";
import CardProduct from "@/components/molecules/CardProduct";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { getProducts } from "@/services/products";
import useLogin from "@/hooks/useLogin";
import formatCurrency from "@/helpers/utils/formatCurrency";
import Modal from "@/components/atoms/Modal";

function ProductsPage({ products }) {
  const username = useLogin();
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const searchProduct = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.location.href = "/login";
  };

  const handleAddToCart = useCallback(
    (id) => {
      if (cart.find((item) => item.id === id)) {
        setCart(
          cart.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          )
        );
      } else {
        setCart([...cart, { id, qty: 1 }]);
      }
    },
    [cart]
  );

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const product = products.find((product) => product.id === item.id);
      if (product) {
        return total + product.price * item.qty;
      }
      return total;
    }, 0);
  }, [cart, products]);

  useEffect(() => {
    // console.log("Saving cart to localStorage:", cart);
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  return (
    <>
      <div className="flex justify-between items-center bg-blue-500 px-5 py-4">
        <h1 className="text-xl">Welcome, {username}</h1>
        <div className="w-[380px]">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-4 rounded-full w-[300px]"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value !== "") {
                setShowSearch(true);
              } else {
                setShowSearch(false);
              }
            }}
          />
          {showSearch && searchProduct.length > 0 && (
            <ul className="absolute bg-white text-black w-[300px] mt-1 py-2 px-3 rounded-lg">
              {searchProduct.map((product) => (
                <li key={product.id} className="my-1">
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          color="bg-red-500"
          textButton="Logout"
          onClick={() => {
            setShowModal(true);
          }}
        />
        {showModal && (
          <Modal handleClose={handleClose} handleLogout={handleLogout} />
        )}
      </div>

      <div className="flex px-5 py-4">
        <div className="flex flex-col w-2/3">
          <h1 className="text-3xl font-bold mb-2 uppercase">Products</h1>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <span className="text-xl font-semibold">Loading...</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {searchProduct.map((item) => (
                <CardProduct key={item.id}>
                  <CardProduct.Header image={item.image} />
                  <CardProduct.Body
                    title={item.title}
                    desc={item.description}
                  />
                  <CardProduct.Footer
                    price={item.price}
                    onClick={() => handleAddToCart(item.id)}
                  />
                </CardProduct>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart w-1/3">
            <h1 className="text-3xl font-bold mb-2 uppercase">Cart</h1>
            <div className="flex flex-col gap-2">
              {cart.map((item) => {
                const product = products.find(
                  (product) => product.id === item.id
                );
                if (!product) {
                  return null; // Skip rendering if product is not found
                }
                return (
                  <div key={item.id} className="flex p-4 border rounded-lg">
                    <img
                      src={product.image}
                      alt="cart item"
                      className="max-w-[100px]"
                    />
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col justify-between ml-3">
                        <span className="font-bold text-xl">
                          {product.title}
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(product.price * item.qty)}
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
              <span className="font-semibold">{formatCurrency(cartTotal)}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [productResults] = await Promise.all([getProducts()]);
    const slicedProducts = productResults.slice(0, 8);
    return {
      props: {
        products: slicedProducts || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
  }
}

export default ProductsPage;
