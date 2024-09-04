import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Produk4 from "../assets/xiaomi.png";
import Produk5 from "../assets/iphone.png";
import Produk6 from "../assets/vivo.png";

const Category = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/phone");
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Xiaomi */}
          <div className="relative group py-10 px-5 bg-gradient-to-br from-blue-400/90 to-blue-900/70 text-white rounded-3xl h-[320px] flex items-end overflow-hidden border-4 border-white">
            <div className="mb-4 relative z-10">
              <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2 group-hover:opacity-0 transition-opacity duration-300">Xiaomi</p>
            </div>
            <img src={Produk4} alt="" className="w-[240px] absolute top-19 left-20" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaShoppingBag size={50} className="text-white cursor-pointer mb-2" onClick={handleClick} />
              <button onClick={handleClick} className=" text-white py-2 px-4 rounded">
                Shop Now
              </button>
            </div>
          </div>

          {/* Apple */}
          <div className="relative group py-10 px-5 bg-gradient-to-br from-green-500/90 to-yellow-500/70 text-white rounded-3xl h-[320px] flex items-end overflow-hidden border-4 border-white">
            <div className="mb-4 relative z-10">
              <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-50 mb-2 text-black group-hover:opacity-0 transition-opacity duration-300">Apple</p>
            </div>
            <img src={Produk5} alt="" className="w-[180px] absolute top-4 right-0" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaShoppingBag size={50} className="text-white cursor-pointer mb-2" onClick={handleClick} />
              <button onClick={handleClick} className=" text-white py-2 px-4 rounded">
                Shop Now
              </button>
            </div>
          </div>

          {/* Vivo */}
          <div className="relative group col-span-2 py-10 px-5 bg-gradient-to-br from-orange-500/90 to-red-600/70 text-white rounded-3xl h-[320px] flex items-end overflow-hidden border-4 ">
            <div className="mb-4 relative z-10">
              <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2 group-hover:opacity-0 transition-opacity duration-300">Vivo Phone</p>
            </div>
            <img src={Produk6} alt="" className="w-[260px] absolute bottom-0 right-0" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaShoppingBag size={50} className="text-white cursor-pointer mb-2" onClick={handleClick} />
              <button onClick={handleClick} className=" text-white py-2 px-4 rounded">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
