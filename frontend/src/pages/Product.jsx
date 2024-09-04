import { useContext, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api } from "../utils";
import { AdminContext } from "../layout/AdminLayout";

export default function Product() {
  const {
    products,
    popUp,
    setPopUp,
    editedProduct,
    setEditedProduct,
    colors,
    series,
  } = useContext(AdminContext);

  const [keyword, setKeyword] = useState("");
  const [brand, setBrand] = useState("Semua");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();

  const getSeriesDetailsById = (id) => {
    return series?.find((s) => s.id === id);
  };

  const getColorNameById = (id) => {
    const color = colors?.find((c) => c.id === id);
    return color?.name;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = editedProduct.id ? api.put : api.post;
    const endpoint = editedProduct.id
      ? `/product/update/${editedProduct.id}`
      : "/product/add";

    action(endpoint, editedProduct)
      .then((res) => {
        alert("Produk telah ditambahkan");
       window.location.reload();
      })
      .catch((e) => {
        alert("An error occurred. Please try again.");
        console.log(e);
      });

    setPopUp(false);
  };

  const handleDelete = () => {
    api
      .delete(`/product/delete/${productToDelete.id}`)
      .then((res) => {
        alert("Produk telah dihapus");
        window.location.reload();
      })
      .catch((e) => {
        alert("An error occurred. Please try again.");
        console.log(e);
      });

    setShowDeleteConfirm(false);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const uniqueBrands = [...new Set(series?.map((serie) => serie.brand_name))];

  const filteredSortedProducts = products?.filter((product) => {
    const matchesKeyword = product.series_name
      ?.toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesBrand = brand === "Semua" || product.brand_name === brand;
    return matchesKeyword && matchesBrand;
  });

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 text-gray-800 text-xl mb-16">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
          <button
              onClick={() => {
                setEditedProduct({});
                setPopUp(true);
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-all duration-200 font-oleo"
            >
              <MdOutlineAddBox className="text-xl" /> Add Product
            </button>

            <div className="flex items-center border px-2 border-gray-300 rounded-md bg-white shadow-sm">
              <input
                type="text"
                placeholder="Search product name"
                className="py-2 px-2 outline-none bg-transparent placeholder:text-gray-500 text-gray-700"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <FiSearch className="text-gray-500" />
            </div>
            <select
              name="brand"
              className="bg-white border-4 border-black rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-gray-500"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="Semua">All Brands</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-200 rounded-md shadow-sm bg-white text-center font-dm-serif">
            <thead className="bg-green-500 text-gray-700">
              <tr>
                <th className="border-4 border-black px-4 py-2 text-center">
                  No
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  Name
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  Brand
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  Price
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  Color
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  Description
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  RAM/Storage
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  Stock
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  Image
                </th>
                <th className="border-4 border-black px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            {filteredSortedProducts?.length > 0 ? (
              <tbody>
                {filteredSortedProducts?.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-100 transition-colors "
                  >
                    <td className="border-4 border-black px-4 py-3">
                      {index + 1}
                    </td>
                    <td className="border-4 border-black px-4 py-3">
                      {getSeriesDetailsById(product.id_series)?.series_name ||
                        "N/A"}
                    </td>
                    <td className="border-4 border-black px-4 py-3">
                      {getSeriesDetailsById(product.id_series)?.brand_name ||
                        "N/A"}
                    </td>
                    <td className="border-4 border-black px-4 py-3">
                      {product.price}
                    </td>
                    <td className="border-4 border-black px-4 py-3">
                      {getColorNameById(product.id_color) || "N/A"}
                    </td>
                    <td className="border-4 border-black px-4 py-3">
                      {truncateText(product.description, 20)} {/* Truncate description */}
                    </td>
                    <td className="border-4 border-black px-4 py-3">
                      {product.ram_storage}
                    </td>
                    <td className="border-4 border-black px-4 py-3">
                      {product.stock}
                    </td>
                    <td className="border-4 border-black px-4 py-3">
                      <img
                        src={product.imageurl}
                        alt={product.name}
                        className="w-20 h-20 object-cover mx-auto"
                      />
                    </td>
                    <td className=" border-4 border-black px-4 py-3 items-center mt-8">
                      <button
                        onClick={() => {
                          setEditedProduct(product);
                          setPopUp(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <HiOutlinePencilAlt className="text-xl" />
                      </button>
                      <button
                        onClick={() => {
                          setProductToDelete(product);
                          setShowDeleteConfirm(true);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaRegTrashAlt className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="10"
                    className="border-4 border-black px-4 py-3 text-center"
                  >
                    No products found.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      {popUp && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="bg-white py-6 px-8 w-full max-w-3xl rounded-xl shadow-lg z-50">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editedProduct.id ? "Edit" : "Add New"} Product
      </h2>
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label
            htmlFor="series"
            className="block text-sm font-semibold mb-2"
          >
            Series
          </label>
          <select
            id="series"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.id_series || ""}
            onChange={(e) => {
              const selectedSeriesId = e.target.value;
              const seriesDetails = getSeriesDetailsById(selectedSeriesId);
              setEditedProduct({
                ...editedProduct,
                id_series: selectedSeriesId,
                series_name: seriesDetails?.series_name || "",
                brand_name: seriesDetails?.brand_name || "",
                description: seriesDetails?.description || "",
              });
            }}
            required
          >
            <option value="" disabled hidden>
              Select Series...
            </option>
            {series.map((s) => (
              <option key={s.id} value={s.id}>
                {s.series_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-semibold mb-2"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.brand_name || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                brand_name: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="series_name"
            className="block text-sm font-semibold mb-2"
          >
            Series Name
          </label>
          <input
            type="text"
            id="series_name"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.series_name || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                series_name: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.description || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                description: e.target.value,
              })
            }
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-semibold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.price || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                price: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-semibold mb-2"
          >
            Color
          </label>
          <select
            id="color"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.id_color || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                id_color: e.target.value, 
                color_name: getColorNameById(e.target.value)
              })
            }
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="ram_storage"
            className="block text-sm font-semibold mb-2"
          >
            RAM/Storage
          </label>
          <input
            type="text"
            id="ram_storage"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.ram_storage || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                ram_storage: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageurl"
            className="block text-sm font-semibold mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageurl"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.imageurl || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                imageurl: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-semibold mb-2"
          >
            Stock
          </label>
          <input
            type="text"
            id="stock"
            className="w-full border-4 border-black px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            value={editedProduct.stock || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                stock: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setPopUp(false)}
            className="bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            {editedProduct.id ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
