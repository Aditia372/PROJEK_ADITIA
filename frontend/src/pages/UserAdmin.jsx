import { useContext } from "react";
import { AdminContext } from "../layout/AdminLayout";

export default function UserAdmin() {
  const { user } = useContext(AdminContext);

  // Filter out users with the "admin" role
  const filteredUsers = user?.filter((u) => u.role !== "admin");

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="text-4xl font-bold text-gray-700 font-dm-serif mb-10 text-center">
        <h2>USERS LIST</h2>
      </div>

      {/* Table for CRUD Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500">
              <th className="border-4 border-black text-center px-4 py-3 text-black text-2xl font-dm-serif">No</th>
              <th className="border-4 border-black text-center px-4 py-3 text-black text-2xl font-dm-serif">Fullname</th>
              <th className="border-4 border-black text-center px-4 py-3 text-black text-2xl font-dm-serif">Username</th>
              <th className="border-4 border-black text-center px-4 py-3 text-black text-2xl font-dm-serif">Email</th>
              <th className="border-4 border-black text-center px-4 py-3 text-black text-2xl font-dm-serif">Password</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((u, index) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="border-4 border-black text-center px-4 py-2">{index + 1}</td>
                <td className="border-4 border-black text-center px-4 py-2">
                  {u.fullname ? u.fullname : "-"}
                </td>
                <td className="border-4 border-black text-center px-4 py-2">{u.username}</td>
                <td className="border-4 border-black text-center px-4 py-2">
                  {u.email.length > 25 ? `${u.email.slice(0, 25)}...` : u.email}
                </td>
                <td className="border-4 border-black text-center px-4 py-2 text-center">
                  ******
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
