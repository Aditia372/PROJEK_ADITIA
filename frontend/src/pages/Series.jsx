import { useContext, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiSearch, FiSave, FiX } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import { api } from "../utils";
import { AdminContext } from "../layout/AdminLayout";

export default function Series() {
  const { series, editedSerie, setEditedSerie, popUp, setPopUp, brands } =
    useContext(AdminContext);

  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const getBrandNameById = (id) => {
    const brand = brands?.find((p) => p.id === id);
    return brand?.name;
  };

  const truncatedDescription = (desc) => {
    const maxLength = 50; // Adjust the length as needed
    if (desc.length > maxLength) {
      return desc.substring(0, maxLength) + "...";
    }
    return desc;
  };

  const filteredSortedSeries = series
    ?.filter(
      (s) =>
        s.series_name.toLowerCase().includes(keyword.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.series_name.localeCompare(b.series_name);
      } else {
        return b.series_name.localeCompare(a.series_name);
      }
    });

  const handleDelete = (id, seriesName) => {
    if (confirm(`Are you sure you want to delete series ${seriesName}?`)) {
      api
        .delete(`/series/delete/${id}`)
        .then((res) => {
          alert(res.message);
          window.location.reload(); // Refresh the page after deletion
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editedSerie.id) {
      api
        .put(`/series/update/${editedSerie.id}`, editedSerie)
        .then((res) => {
          alert(res.message);
          window.location.reload(); // Refresh the page after updating
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      api
        .post("/series/add", editedSerie)
        .then((res) => {
          alert(res.message);
          window.location.reload(); // Refresh the page after adding
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setPopUp(false);
  };

  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-100 text-gray-900 mb-16 min-h-screen">
      {/* CRUD SERIES */}
      <div className="bg-white shadow-lg rounded-lg p-6 gap-5">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              setEditedSerie({});
              setPopUp(!popUp);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-transform duration-200 transform hover:scale-105"
          >
            <MdOutlineAddBox className="text-xl" />{" "}
            <span className="font-oleo">Add Series</span>
          </button>
          <div className="flex items-center gap-4 ml-5 flex-grow">
            <div className="flex items-center border-2 border-black rounded-3xl bg-gray-50 shadow-sm relative flex-grow">
              <input
                type="text"
                placeholder="Search series name"
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
          <table className="min-w-full border-4 border-gray-300 rounded-lg shadow-sm bg-white">
            <thead className="bg-green-500 text-gray-700 border-4 border-gray-300">
              <tr>
                <th className="border-4 border-black px-6 py-3 font-medium font-dm-serif text-xl text-center text-black">
                  No
                </th>
                <th className="border-4 border-black px-6 py-3 font-medium font-dm-serif text-xl text-center text-black">
                  Series Name
                </th>
                <th className="border-4 border-black px-6 py-3 font-medium font-dm-serif text-xl text-center text-black">
                  Description
                </th>
                <th className="border-4 border-black px-6 py-3 font-medium font-dm-serif text-xl text-center text-black">
                  Brand
                </th>
                <th className="border-4 border-black px-6 py-3 font-medium font-dm-serif text-xl text-center text-black">
                  Actions
                </th>
              </tr>
            </thead>
            {filteredSortedSeries?.length > 0 ? (
              <tbody>
                {filteredSortedSeries?.map((s, index) => (
                  <tr
                    key={s.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50 text-center font-medium font-dm-serif" : "bg-white text-center font-medium font-dm-serif"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="border-4 border-black px-6 py-4 text-gray-800">
                      {index + 1}
                    </td>
                    <td className="border-4 border-black px-6 py-4 text-gray-800">
                      {s.series_name}
                    </td>
                    <td className="border-4 border-black px-6 py-4 text-gray-800">
                      <div className="relative group">
                        <span>
                          {truncatedDescription(s.description)}
                        </span>
                        {s.description.length > 50 && (
                          <div className="absolute left-0 mt-2 p-2 bg-gray-800 text-white rounded-md hidden">
                            {s.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border-4 border-black px-6 py-4 text-gray-800">
                      {getBrandNameById(s.brand_id)}
                    </td>
                    <td className="border-4 border-black px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            setEditedSerie(s);
                            setPopUp(!popUp);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md transition-transform duration-200 transform hover:scale-105"
                          aria-label="Edit Series"
                        >
                          <HiOutlinePencilAlt className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.series_name)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md transition-transform duration-200 transform hover:scale-105"
                          aria-label="Delete Series"
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
                  <td colSpan="5" className="text-center py-8 text-2xl text-red-600 font-oleo">
                    No Series found !
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        {/* Popup Form */}
        {popUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 font-dm-serif">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <button
                onClick={() => setPopUp(false)}
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-semibold mb-4 text-center">Series Form</h2>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block mb-2 text-lg font-medium">Series Name</label>
                  <input
                    type="text"
                    value={editedSerie.series_name || ""}
                    onChange={(e) =>
                      setEditedSerie((prev) => ({
                        ...prev,
                        series_name: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-lg font-medium">Description</label>
                  <textarea
                    value={editedSerie.description || ""}
                    onChange={(e) =>
                      setEditedSerie((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    rows="4"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-lg font-medium">Brand</label>
                  <select
                    value={editedSerie.brand_id || ""}
                    onChange={(e) =>
                      setEditedSerie((prev) => ({
                        ...prev,
                        brand_id: e.target.value,
                        brand_name: getBrandNameById(e.target.value),
                      }))
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  >
                    <option value="">Select a brand</option>
                    {brands?.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {editedSerie.id ? "Save Changes" : "Add Series"}
                    <FiSave className="inline ml-2" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPopUp(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
                  >
                    Cancel
                    <FiX className="inline ml-2" />
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
