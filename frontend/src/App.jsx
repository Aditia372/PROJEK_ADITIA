import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { api } from "./utils";
import Header from "./pages/Header";
import Footer from  "./components/Footer";
// import Loading from "./components/Loading";

export const AllContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [register, setRegister] = useState({});
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [colors, setColors] = useState([]);
  const [series, setSeries] = useState([]);
  // const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [sortPrice, setSortPrice] = useState("asc");
  const [sortBy, setSortBy] = useState("price");
  const [category, setCategory] = useState("Semua");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get("/product/all").then((response) => setProducts(response));
    api.get("/auth/my-account").then((response) => setUser(response.data));
    api
      .get(`/cart/get/${localStorage.getItem("id")}`)
      .then((response) => setCart(response));
    api
      .get(`/order/get/${localStorage.getItem("id")}`)
      .then((res) => setOrders(res));
  }, [user?.id]);
  return (
    <AllContext.Provider
      value={{
        products,
        setProducts,
        wishlist,
        setWishlist,
        register,
        setRegister,
        orders,
        setOrders,
        cart,
        setCart,
        keyword,
        setKeyword,
        sortPrice,
        setSortPrice,
        sortBy,
        setSortBy,
        category,
        setCategory,
        colors,
        setColors,
        series,
        setSeries,
        messages,
        setMessages
      }}
    >
      <Header />
      <Outlet context={[user, setUser]} />
      <Footer />
    </AllContext.Provider>
  );
}

export default App;
