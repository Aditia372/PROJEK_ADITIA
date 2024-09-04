import { useContext, useState } from "react";
import { api } from "../utils";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AllContext } from "../App";
import avatarImage from "../assets/avatar.png";
import { LogOutIcon, EditIcon } from "lucide-react";
import Out from "./Out";

export default function MyAccount() {
  const [user, setUser] = useOutletContext();
  const { orders } = useContext(AllContext);
  const [editedUser, setEditedUser] = useState({});
  const [popUp, setPopUp] = useState(false); // State for pop-up visibility

  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedUser.id) {
        api
            .put(`/auth/update/${editedUser.id}`, editedUser)
            .then((res) => {
                alert("Account successfully updated.");
                setUser({ ...user, ...editedUser }); // Update the user state with the latest information
                setPopUp(false); // Close the pop-up after successful update
                handleLogout(); // Directly logout after successful update
            })
            .catch((e) => {
                console.log(e);
            });
    }
};

const handleLogout = () => {
    api.get("/auth/logout").then((res) => {
        alert(res.msg || "You have been logged out.");
        setUser({});
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        navigate("/login");
    });
};


  if (localStorage.getItem("id")) {
    return (
      <div className="py-6 px-7 font-KumbhSans bg-gray-100 min-h-screen">
        
        {/* Conditionally render pop-up form */}
        {popUp && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white py-4 px-4 w-96 rounded-2xl shadow-lg z-50">
              <h2 className="text-xl font-bold mb-4 text-center">EDIT USER</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="fullname" className="block text-black font-bold mb-2">Fullname</label>
                  <input
                    type="text"
                    id="fullname"
                    className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                    value={editedUser.fullname || ""}
                    onChange={(e) => setEditedUser({ ...editedUser, fullname: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-black font-bold mb-2">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                    value={editedUser.username || ""}
                    onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-black font-bold mb-2">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                    value={editedUser.email || ""}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setPopUp(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main account info */}
        <div className="bg-blue-400 p-6 rounded-lg shadow-md flex">
          {/* Profile Image */}
          <div className="w-[400px] flex-shrink-0 mr-6">
            <img src={avatarImage} alt="User Avatar" className="w-full h-auto object-cover rounded-full" />
            <hr className="h-3"/>
            <div className="flex flex-col mt-4 gap-2">
              <button
                onClick={() => {
                  setEditedUser(user);
                  setPopUp(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded flex items-center"
              >
                <EditIcon className="w-5 h-5 mr-2" />
                Edit
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded flex items-center"
              >
                <LogOutIcon className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="w-3/4 bg-blue-300 p-6 rounded-lg shadow-md">
            <h3 className="text-6xl font-semibold py-4 ml-60 mb-4 font-oleo">Profile Information</h3>
            <div className="mb-9">
              <label htmlFor="fullname" className="block text-black  mb-2  font-dm-serif text-3xl">Fullname : </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={user?.fullname || ""}
                disabled
                className="w-full border border-blue-800 px-2 py-2 focus:outline-none focus:border-gray-600 font-dm-serif text-2xl"
              />
            </div>
            <div className="mb-9">
              <label htmlFor="username" className="block text-black mb-2 text-2xl font-dm-serif text-3xl">Username :</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user?.username || ""}
                disabled
                className="w-full border border-blue-800 px-2 py-2 focus:outline-none focus:border-gray-600 font-dm-serif text-2xl" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-black mb-2 text-3xl font-dm-serif">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email || ""}
                disabled
                className="w-full border border-blue-800 px-2 py-2 focus:outline-none focus:border-gray-600 font-dm-serif text-2xl"
              />
            </div>
          </div>
        </div>

        {/* Orders section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
  <h3 className="text-4xl font-semibold mb-6 font-dm-serif text-gray-800">My Orders History</h3>
  {orders?.length > 0 ? (
    <table className="w-full border-collapse table-auto bg-gray-100 rounded-lg overflow-hidden table-fixed">
      <thead className="bg-gray-200 text-gray-700">
        <tr>
          <th className="py-4 px-4 text-center">Image</th>
          <th className="py-3 px-4 text-center">Series</th>
          <th className="py-3 px-4 text-center">Price</th>
          <th className="py-3 px-4 text-center">Shipping Address</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id} className="bg-white border-b hover:bg-gray-50">
            <td className="py-4 px-4 text-center">
              <img src={o.imageurl} alt="" className="w-32 h-30 object-cover rounded-md ml-24" />
            </td>
            <td className="py-4 px-4 text-center">{o.series_name}</td>
            <td className="py-4 px-4 text-center text-gray-900"> {formatPrice(o.total_price)}</td>
            <td className="py-4 px-4 text-center text-gray-700">{o.shipping_address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-center text-gray-600">Kamu Belum Melakukan Transaksi</p>
  )}
</div>

      </div>
    );
  }
  return (
    <div className="py-6 px-7 font-KumbhSans min-h-screen bg-white">
      <Out />
    </div>
  );
}
