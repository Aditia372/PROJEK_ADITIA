import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import Produk7 from "../assets/samsung.png";
import Produk9 from "../assets/oppo.png";
import Produk8 from "../assets/infinix.png";

const Category2 = () => {
  const handleShopNowClick = () => {
    alert('Shop Now clicked!');
    // Add your navigation logic here
  };

  return (
    <div className="py-2">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Samsung */}
          <div className="relative group col-span-2 py-10 px-5 bg-gradient-to-br from-red-600/90 to-orange-600/70 text-white rounded-3xl h-[320px] flex items-end overflow-hidden border-4">
            <div className="relative z-10 mb-4">
              <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2 group-hover:opacity-0 transition-opacity duration-300">Samsung</p>
            </div>
            <img src={Produk7} alt="Samsung" className="w-[360px] absolute top-2 left-60" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaShoppingBag size={50} className="text-white mb-2 cursor-pointer" onClick={handleShopNowClick} />
              <button onClick={handleShopNowClick} className="text-white py-2 px-4 rounded ">
                Shop Now
              </button>
            </div>
          </div>

          {/* Infinix */}
          <div className="relative group py-10 px-5 bg-gradient-to-br from-yellow-500/70 to-green-500/90 text-white rounded-3xl h-[320px] flex items-end overflow-hidden border-4">
            <div className="relative z-10 mb-4">
              <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2 group-hover:opacity-0 transition-opacity duration-300">Infinix</p>
            </div>
            <img src={Produk8} alt="Infinix" className="w-[230px] absolute top-0 left-20" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaShoppingBag size={50} className="text-white mb-2 cursor-pointer" onClick={handleShopNowClick} />
              <button onClick={handleShopNowClick} className="text-white py-2 px-4 rounded">
                Shop Now
              </button>
            </div>
          </div>

          {/* Oppo */}
          <div className="relative group py-10 px-5 bg-gradient-to-br from-blue-800/70 to-blue-400/90 text-white rounded-3xl h-[320px] flex items-end overflow-hidden border-4">
            <div className="relative z-10 mb-4">
              <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2 group-hover:opacity-0 transition-opacity duration-300">Oppo</p>
            </div>
            <img src={Produk9} alt="Oppo" className="w-[150px] absolute top-6 left-32" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaShoppingBag size={50} className="text-white mb-2 cursor-pointer" onClick={handleShopNowClick} />
              <button onClick={handleShopNowClick} className="text-white py-2 px-4 rounded ">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category2;
