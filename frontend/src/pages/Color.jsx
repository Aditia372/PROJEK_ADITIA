import { useContext, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiSearch, FiSave, FiX } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import { api } from "../utils";
import { AdminContext } from "../layout/AdminLayout";

export default function Product() {
  const { colors, popUp, setPopUp, editedColor, setEditedColor } =
    useContext(AdminContext);

  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("Semua");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredSortedColors = colors
    ?.filter(
      (color) =>
        color.name.toLowerCase().includes(keyword.toLowerCase()) &&
        (id === "Semua" || color.id === id)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-100 text-gray-900 mb-16 min-h-screen">
      {/* CRUD PRODUCTS */}
      <div className="bg-white shadow-lg rounded-lg p-6 gap-5">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              setEditedColor({});
              setPopUp(!popUp);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-transform duration-200 transform hover:scale-105"
          >
            <MdOutlineAddBox className="text-xl" />{" "}
            <span className="font-oleo">Add Color</span>
          </button>
          <div className="flex items-center gap-4 ml-5 flex-grow">
            <div className="flex items-center border-2 rounded-3xl border-black  bg-gray-50 shadow-sm relative flex-grow">
              <input
                type="text"
                placeholder="Search color name"
                className="py-2 px-4 outline-none bg-transparent placeholder:text-gray-500 text-gray-700 rounded-l-md w-full"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <FiSearch className="text-gray-500 mr-3 absolute right-2" />
            </div>

            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm transition-transform duration-200 transform hover:scale-105"
            >
              {sortOrder === "asc" ? (
                <>
                  <RiSortAsc className="text-xl" /> Sort Asc
                </>
              ) : (
                <>
                  <RiSortDesc className="text-xl" /> Sort Desc
                </>
              )}
            </button>
          </div>
        </div>

        {/* Table for CRUD Data */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-4 border-black rounded-lg shadow-sm bg-white">
            <thead className="bg-green-500 text-gray-700 border-4 border-black">
              <tr>
                <th className="border-4 border-black px-6 py-3 font-dm-serif text-2xl text-center text-black">
                  No
                </th>
                <th className="border-4 border-black px-6 py-3 font-medium font-dm-serif text-2xl text-center text-black">
                  Name
                </th>
                <th className="border-4 border-black px-6 py-3 font-medium font-dm-serif text-2xl text-center text-black">
                  Actions
                </th>
              </tr>
            </thead>
            {filteredSortedColors?.length > 0 ? (
              <tbody>
                {filteredSortedColors?.map((color, index) => (
                  <tr
                    key={color.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50 text-xl font-valera text-center" : "bg-white text-xl font-valera text-center"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="border-4 border-black px-6 py-4 text-gray-800">
                      {index + 1}
                    </td>
                    <td className="border-4 border-black px-6 py-4 text-gray-800">
                      {color.name}
                    </td>
                    <td className="border-4  border-black px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            setEditedColor(color);
                            setPopUp(!popUp);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md transition-transform duration-200 transform hover:scale-105"
                          aria-label="Edit Color"
                        >
                          <HiOutlinePencilAlt className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to delete ${color.name}?`
                              )
                            ) {
                              api
                                .delete(`/color/delete/${color.id}`)
                                .then((res) => {
                                  alert("Deleted successfully");
                                  window.location.reload(); // Refresh the page after deletion
                                })
                                .catch((e) => {
                                  console.log(e);
                                });
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md transition-transform duration-200 transform hover:scale-105"
                          aria-label="Delete Color"
                        >
                          <FaRegTrashAlt className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="3" className="text-center py-8 text-gray-500">
                    No Colors found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        {/* Popup Form */}
        {popUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white py-6 px-8 w-full max-w-lg rounded-xl shadow-lg z-50">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                <span className="text-2xl font-bold">
                  {editedColor.id ? "Edit" : "Add New"} Color
                </span>
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editedColor.id) {
                    api
                      .put(`/color/update/${editedColor.id}`, editedColor)
                      .then((res) => {
                        alert(res.message);
                        window.location.reload(); // Refresh the page after updating
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  } else {
                    api
                      .post("/color/add", editedColor)
                      .then((res) => {
                        alert(res.message);
                        window.location.reload(); // Refresh the page after adding
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }
                  setPopUp(!popUp);
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    <FiSave className="inline-block mr-2" />
                    Color Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
                    value={editedColor.name || ""}
                    onChange={(e) =>
                      setEditedColor({
                        ...editedColor,
                        name: e.target.value,
                      })
                    }
                    required
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setPopUp(!popUp)}
                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-transform duration-200 transform hover:scale-105"
                  >
                    <FiX className="w-5 h-5" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-transform duration-200 transform hover:scale-105"
                  >
                    <FiSave className="w-5 h-5" />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
