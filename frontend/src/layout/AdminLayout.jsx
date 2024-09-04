import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { createContext } from "react";
import { api } from "../utils";
import Out from "../pages/Out";

export const AdminContext = createContext();

const AdminLayout = ({ children }) => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false);
  const [editedProduct, setEditedProduct] = useState();
  const [editedColor, setEditedColor] = useState(false);
  const [editedUser, setEditedUser] = useState();
  const [editedSerie, setEditedSerie] = useState();
  const [editedStatus, setEditedStatus] = useState();
  const [editedSize, setEditedSize] = useState();
  const [editedBrand, setEditedBrand] = useState();
  const [admin, setAdmin] = useState({});
  const [colors, setColors] = useState([]);
  const [series, setSeries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [theme, setTheme] = useState("light");
  const [brands, setBrands] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/product/all").then((res) => {
      setProducts(res);
    });
    api.get("/color/all").then((res) => {
      setColors(res);
    });
    api.get("/brand/all").then((res) => {
      setBrands(res);
    });
    api.get("/series/all").then((res) => {
      setSeries(res);
    });
    api.get("/auth/get-all").then((res) => {
      setUser(res);
    });
    api.get("/order/get-all").then((res) => {
      setOrders(res);
    });
  }, []);
  if (localStorage.getItem("role") == "admin"){
  return (
    <AdminContext.Provider
      value={{
        products,
        setProducts,
        popUp,
        setPopUp,
        popUp2,
        setPopUp2,
        editedProduct,
        setEditedProduct,
        editedColor,
        setEditedColor,
        loading,
        setLoading,
        user,
        setUser,
        editedUser,
        setEditedUser,
        series,
        setSeries,
        editedSerie,
        setEditedSerie,
        editedSize,
        setEditedSize,
        orders,
        setOrders,
        editedStatus,
        setEditedStatus,
        theme,
        setTheme,
        colors,
        setColors,
        brands,
        setBrands,
        editedBrand,
        setEditedBrand,
        users,
        setUsers
              }}
    >
      <div
        className={`flex h-screen overflow-hidden font-KumbhSans ${
          theme === "dark" ? "bg-[#1a1a29] text-white" : "bg-white text-black"
        }`}
      >
        <Transition
          as={Fragment}
          show={showNav}
          enter="transform transition duration-[400ms]"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-[400ms] transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <SideBar showNav={showNav} />
        </Transition>

        <div className="flex-1 overflow-y-auto">
          <TopBar showNav={showNav} setShowNav={setShowNav} />
          <main
            className={`pt-16 transition-all duration-[400ms] ${
              showNav && !isMobile ? "pl-56" : ""
            }`}
          >
            {/* <WelcomePage /> */}
            <div className="px-4 md:px-16">{children}</div>
            <Outlet context={{ setPopUp, setPopUp2, setEditedProduct }} />
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
  } else {
    return <Out />
  }
};

export default AdminLayout;
