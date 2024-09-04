import { useContext } from "react";
import { AdminContext } from "../layout/AdminLayout";

export default function Orders() {
  const { orders, users, products } = useContext(AdminContext);

  // Function to get product details by id
  const getProductById = (id) => {
    return products?.find((p) => p.id === id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-center font-dm-serif">
      <div className="mb-6">
        <h2 className="text-4xl mb-6 font-semibold text-gray-800">Order List</h2>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-separate border-spacing-0">
          <thead className="bg-green-200 text-black">
            <tr>
              <th className="border-b border-gray-300 px-4 py-2 ">No</th>
              <th className="border-b border-gray-300 px-4 py-2 ">Receiver</th>
              <th className="border-b border-gray-300 px-4 py-2 ">Name Product</th>
              <th className="border-b border-gray-300 px-4 py-2 ">Color Choice</th>
              <th className="border-b border-gray-300 px-4 py-2 ">RAM & Storage</th>
              <th className="border-b border-gray-300 px-4 py-2 ">Address</th>
              <th className="border-b border-gray-300 px-4 py-2 ">No. Phone</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.orders?.map((s, index) => {
              const product = getProductById(s.product_id);
              return (
                <tr key={s.id} className="hover:bg-gray-100">
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{s.shipping_name}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{product?.series_name}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{product?.color_name}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{product?.ram_storage}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{s.shipping_address}</td>
                  <td className="border-b border-gray-300 px-4 py-2">{s.shipping_phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
