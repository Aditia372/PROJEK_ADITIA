import { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../App";
import { FaPhone } from "react-icons/fa";

export default function Phone() {
  const { products } = useContext(AllContext);
  const [keyword, setKeyword] = useState("");
  const [brand, setBrand] = useState("Semua");
  const [sortOrder, setSortOrder] = useState("asc"); // State untuk menyimpan urutan sort
  const navigate = useNavigate();

  // Membuat Set untuk memastikan nama brand unik
  const uniqueBrands = [...new Set(products?.map(product => product.brand_name))];

  // Filter produk berdasarkan keyword dan brand
  const filteredSortedProducts = products?.filter((product) => {
    const matchesKeyword = product.series_name?.toLowerCase().includes(keyword.toLowerCase());
    const matchesBrand = brand === "Semua" || product.brand_name === brand;
    return matchesKeyword && matchesBrand;
  }).sort((a, b) => { 
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  }); // Sort produk berdasarkan harga

  // Group produk berdasarkan series_name dan kumpulkan id-nya
  const groupedProducts = filteredSortedProducts?.reduce((acc, product) => {
    if (!acc[product.series_name]) {
      acc[product.series_name] = [];
    }
    acc[product.series_name].push(product);
    return acc;
  }, {});

  // Fungsi untuk memformat harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-300 text-gray-800 text-xl mb-16">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 flex-grow">
          <div className="flex items-center border-2 px-2 border-black rounded-3xl bg-white shadow-sm flex-grow">
            <input
              type="text"
              placeholder="Search Smartphone"
              className="py-2 px-2 outline-none bg-transparent placeholder:text-gray-500 text-gray-700 w-full"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <FiSearch className="text-gray-500" />
          </div>
          <div className="flex items-center gap-4">
            <select
              name="brand"
              className="bg-black border-2 border-black rounded-3xl py-2 px-4 shadow-sm focus:outline-none focus:border-gray-500 text-white text-center font-valera"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="Semua">Brand</option>
              {uniqueBrands?.map((brandName) => (
                <option key={brandName} value={brandName}>
                  {brandName}
                </option>
              ))}
            </select>
            <select
              name="sortOrder"
              className="bg-black text-center font-valera text-white border-2 border-black rounded-3xl py-2 px-4 shadow-sm focus:outline-none focus:border-gray-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Termurah</option>
              <option value="desc">Termahal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 text-center justify-center">
        {Object.entries(groupedProducts)?.map(([series_name, products]) => {
          const ids = products?.map((product) => product.id).join(",");
          return (
            <div
              key={series_name}
              className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer relative border-2 border-black"
              onClick={() => {
                localStorage.setItem("id_product", products[0].id);
                navigate(`/product/${ids}`);
              }}
            >
              <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs font-bold uppercase px-4 py-1 rounded-tr-xl rounded-bl-xl">
                {products[0].brand_name}
              </div>
              <img
                src={products[0].imageurl}
                alt={`Image of ${series_name}`}
                className="h-80 w-full object-cover rounded-t-xl"
              />
              <hr className="border-2 border-black" />
              <div className="px-4 py-3">
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {series_name || "Product Name"}
                </p>
                <div className="flex items-center text-center justify-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    {formatPrice(products[0].price)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
