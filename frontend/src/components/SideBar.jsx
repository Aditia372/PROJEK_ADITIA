import { forwardRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  CreditCard,
  User,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useLocation();
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [isProdukOpen, setIsProdukOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleProdukMenu = () => {
    setIsProdukOpen(!isProdukOpen);
  };

  const toggleAccountMenu = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const handleLogout = () => {
    // Clear authentication data, e.g., localStorage or cookies
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id"); // Example
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div
      ref={ref}
      className="fixed w-56 h-full bg-gradient-to-b from-green-900/90 to-cyan-800/70 shadow-lg border-r-2 border-gray-200 text-white"
    >
      {/* Sidebar Logo or Name */}
      <div className="flex justify-center items-center mt-6 mb-14">
        <h1>
          <span className="font-baru text-3xl">GALAXY's</span>
          <br />
          <span className="font-oleo text-4xl ml-24"> Admin</span>
        </h1>
      </div>
      {/* Sidebar Menu */}
      <div className="flex flex-col">
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center justify-between transition-colors ${
            isProdukOpen ? "bg-green-600 border-4" : "hover:bg-green-500"
          }`}
          onClick={toggleProdukMenu}
        >
          <div className="flex items-center">
            <Home className="w-5 h-5 mr-2" />
            <p>Produk</p>
          </div>
          {isProdukOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>

        {isProdukOpen && (
          <div className="ml-8">
            <Link to="/admin/produk/color">
              <div
                className={`pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-2 flex items-center transition-colors ${
                  router.pathname === "/admin/produk/color"
                    ? "bg-green-500"
                    : "hover:bg-green-500"
                }`}
              >
                <p>Warna</p>
              </div>
            </Link>
            <Link to="/admin/produk/brand">
              <div
                className={`pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-2 flex items-center transition-colors ${
                  router.pathname === "/admin/produk/brand"
                    ? "bg-green-500"
                    : "hover:bg-green-500"
                }`}
              >
                <p>Brand</p>
              </div>
            </Link>
            <Link to="/admin/produk/series">
              <div
                className={`pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-2 flex items-center transition-colors ${
                  router.pathname === "/admin/produk/series"
                    ? "bg-green-500"
                    : "hover:bg-green-500"
                }`}
              >
                <p>Seri</p>
              </div>
            </Link>
            <Link to="/admin/produk">
              <div
                className={`pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-2 flex items-center transition-colors ${
                  router.pathname === "/admin/produk"
                    ? "bg-green-500"
                    : "hover:bg-green-500"
                }`}
              >
                <p>Phone</p>
              </div>
            </Link>
          </div>
        )}

        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center justify-between transition-colors ${
            isAccountOpen ? "bg-green-500 border-4" : "hover:bg-green-500"
          }`}
          onClick={toggleAccountMenu}
        >
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            <p>Account</p>
          </div>
          {isAccountOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>

        {isAccountOpen && (
          <div className="ml-8">
            <Link to="/admin/account/auth">
              <div
                className={`pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-2 flex items-center transition-colors ${
                  router.pathname === "/admin/account/auth"
                    ? "bg-green-500"
                    : "hover:bg-green-500"
                }`}
              >
                <p>User Account</p>
              </div>
            </Link>
            <Link to="/admin/account/auth/admin">
              <div
                className={`pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-2 flex items-center transition-colors ${
                  router.pathname === "/admin/account/auth/admin"
                    ? "bg-green-500"
                    : "hover:bg-green-500"
                }`}
              >
                <p>Admin Account</p>
              </div>
            </Link>
          </div>
        )}

        <Link to="/admin/order">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname === "/admin/order"
                ? "bg-green-500"
                : "hover:bg-green-500"
            }`}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            <p>Orders</p>
          </div>
        </Link>

        {/* Logout Button */}
        <div
          className="pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors hover:bg-red-600"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
});
SideBar.displayName = "SideBar";

export default SideBar;
