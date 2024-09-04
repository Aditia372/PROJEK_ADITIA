import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AdminContext } from "../layout/AdminLayout";
import { api } from "../utils";

export default function AdminAccount() {
  const { popUp, setPopUp, editedUser, setEditedUser, user } = useContext(AdminContext);

  // Filter only users with the "admin" role
  const adminUsers = user?.filter((u) => u.role === "admin");

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg font-dm-serif">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800 font-dm-serif">Admin Account</h2>
        <button
          onClick={() => {
            setEditedUser({});
            setPopUp(!popUp);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
        >
          <MdOutlineAddBox className="text-lg" /> Add Admin
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-center">No</th>
              <th className="py-3 px-6 text-center">Fullname</th>
              <th className="py-3 px-6 text-center">Username</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers?.map((u, index) => (
              <tr key={u.id} className="border-t border-gray-200 hover:bg-gray-100 text-center">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{u.fullname || "-"}</td>
                <td className="py-3 px-6">{u.username}</td>
                <td className="py-3 px-6">{u.email.length > 25 ? `${u.email.slice(0, 25)}...` : u.email}</td>
                <td className="py-3 px-6 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setEditedUser(u);
                      setPopUp(!popUp);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow"
                  >
                    <HiOutlinePencilAlt className="text-lg" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Apakah anda yakin ingin menghapus admin dengan username ${u.username}?`)) {
                        api.delete(`/auth/delete/${u.id}`)
                          .then((res) => alert(res.msg))
                          .catch((e) => console.log(e));
                        window.location.href = "/admin/account/auth/admin";
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow"
                  >
                    <FaRegTrashAlt className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 w-full max-w-lg rounded-xl shadow-lg z-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">{editedUser.id ? "Edit" : "Add New"} Admin</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editedUser.id) {
                  api.put(`/auth/update/${editedUser.id}`, editedUser)
                    .then((res) => {
                      alert(res.msg);
                      window.location.href = "/admin/account/auth/admin";
                    })
                    .catch((e) => console.log(e));
                } else {
                  api.post("/auth/add", editedUser)
                    .then((res) => {
                      alert(res.msg);
                      window.location.href = "/admin/account/auth/admin";
                    })
                    .catch((e) => console.log(e));
                }
                setPopUp(!popUp);
              }}
            >
              <div className="mb-4">
                <label htmlFor="fullname" className="block text-gray-700 font-bold mb-2">Fullname</label>
                <input
                  type="text"
                  id="fullname"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-gray-500"
                  value={editedUser.fullname}
                  onChange={(e) => setEditedUser({ ...editedUser, fullname: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-gray-500"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-gray-500"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </div>

              {!editedUser.id && (
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-gray-500"
                    value={editedUser.password}
                    onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                  />
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Role</label>
                <select
                  id="role"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-gray-500"
                  value={editedUser.role || ""}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                >
                  <option value="">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setPopUp(!popUp)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
