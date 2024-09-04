import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MouseFollower } from "react-mouse-follower";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Color from "./pages/Color.jsx"
import Brand from "./pages/Brand.jsx"
import Series from "./pages/Series.jsx"
import Login from "./components/Login.jsx";
import Register from "./pages/Register.jsx";
import Phone from "./pages/Phone.jsx";
import Carts from "./pages/Carts.jsx"
import UserAccount from "./pages/UserAccount.jsx"
import Detail from "./pages/Detail.jsx"
import UserAdmin from "./pages/userAdmin.jsx";
import AdminAccount from "./pages/AdminAccount.jsx";
import OrderAdmin from "./pages/OrderAdmin.jsx";
import Out from "./pages/Out.jsx";
import About from "./pages/About.jsx";
import Out2 from "./pages/Out2.jsx";
import WelcomePage from "./components/Welcome.jsx";
import PhoneDetail from "./pages/PhoneDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/phone",
        element: <Phone />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/account",
        element: <UserAccount />,
      },
      {
        path : "/register",
        element : <Register />
      },
      {
        path: "/product/:ids",
        element: <PhoneDetail />,
      },
      {
        path: "/cart",
        element: <Carts />,
      },
      {
        path: "/detail-product",
        element: <Detail />,
      },

      {
        path: "/out",
        element: <Out />, 
      },
      {
        path: "/out2",
        element: <Out2 />,
      }


    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [

      {
        path: "/admin/produk",
        element: <Product />,
      },
      {
        path: "/admin/produk/color",
        element: <Color />
      },
      {
        path: "/admin/produk/brand",
        element: <Brand />
      },
      {
        path: "/admin/produk/series",
        element: <Series />
      },
      {
        path: "/admin/account/auth",
        element: <UserAdmin />
      },
      {
        path: "/admin/account/auth/admin",
        element: <AdminAccount />
      },
      {
        path : "/admin/order",
        element : <OrderAdmin />
      },
      {
        path : "/admin",
        element : <WelcomePage />
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MouseFollower />
    <RouterProvider router={router} />
  </React.StrictMode>
);
