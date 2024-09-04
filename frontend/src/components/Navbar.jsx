import React, { useContext } from "react";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { UpdateFollower } from "react-mouse-follower";
import { motion } from "framer-motion";
import { LucideLogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { AllContext } from "../App";

const NavbarMenu = () => [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "Market",
    link: "/phone", // Mengarah ke phone.jsx
  },
  {
    id: 3,
    title: "About",
    link: "/about",
  },
  {
    id: 4,
    title: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const { cart } = useContext(AllContext);

  return (
    <div className="bg-brandDark text-white py-8 font-valera">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="container flex justify-between items-center"
      >
        {/* logo */}
        <div>
          <a href="/" className="text-xl font-bold uppercase">
            Galaxy <span className="font-extralight text-white/70">Phone</span>
          </a>
        </div>
        {/* links */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4">
            {NavbarMenu().map((item) => (
              <li key={item.id}>
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "white",
                    zIndex: 999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference",
                  }}
                >
                  <Link
                    to={item.link}
                    className="inline-block text-sm py-2 px-3 uppercase"
                  >
                    {item.title}
                  </Link>
                </UpdateFollower>
              </li>
            ))}
            <li className="relative flex items-center gap-4">
              <UpdateFollower
                mouseOptions={{
                  backgroundColor: "white",
                  zIndex: 999,
                  followSpeed: 1.5,
                  scale: 5,
                  mixBlendMode: "difference",
                }}
              >
                <Link to="/cart" className="relative flex items-center">
                  {cart?.length > 0 && (
                    <div className="absolute -right-2 -top-2 text-black px-1 bg-green-500 rounded-full text-xs font-dm-serif">
                      {cart.length}
                    </div>
                  )}
                  <FaShoppingBag className="text-2xl" />
                </Link>
              </UpdateFollower>
              <UpdateFollower
                mouseOptions={{
                  backgroundColor: "white",
                  zIndex: 999,
                  followSpeed: 1.5,
                  scale: 5,
                  mixBlendMode: "difference",
                }}
              >
                <Link to="/account" className="text-xl">
                  <MdAccountCircle className="text-3xl" />
                </Link>
              </UpdateFollower>
              <UpdateFollower
                mouseOptions={{
                  backgroundColor: "white",
                  zIndex: 999,
                  followSpeed: 1.5,
                  scale: 5,
                  mixBlendMode: "difference",
                }}
              >
                <Link to="/Login" className="text-xl flex items-center gap-2">
                  <LucideLogIn className="text-3xl" />
                </Link>
              </UpdateFollower>
            </li>
          </ul>
        </div>
        {/* mobile menu */}
        <div className="md:hidden">
          <MdMenu className="text-3xl" />
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
