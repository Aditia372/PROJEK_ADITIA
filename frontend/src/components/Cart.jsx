/* eslint-disable react/prop-types */
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { api } from "../utils";

export default function Cart({
  id,
  id_product,
  series_name,
  image,
  total_product,
  price,
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-5 py-2 border-b-[1px] border-black">
      <IoMdCloseCircleOutline
        className="text-2xl cursor-pointer"
        onClick={() => {
          api.delete(`/cart/delete/${id}`).then(() => {
            window.location.reload();
          });
        }}
      />
      <Link
        to={`/product/${id_product}`}
        className="w-3/5 flex flex-row items-center gap-7 py-2"
      >
        <img src={image} alt="" className="w-12" />
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-extrabold tracking-wider">
            {series_name}
          </h1>
          <h1 className="text-sm text-gray-600 font-semibold tracking-wider">
            {total_product} x Rp{parseInt(price).toLocaleString("id-ID")}
          </h1>
        </div>
      </Link>
      <div className="w-1/5">
        <div className="flex flex-row items-center py-3 px-2 justify-between ">
          <FaMinus
            className="cursor-pointer"
            onClick={() => {
              if (total_product > 1) {
                api
                  .put(`/cart/update/${id}`, {
                    id_user: localStorage.getItem("id"),
                    id_product: id_product,
                    total_product: parseInt(total_product) - 1,
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }
            }}
          />
          <h1>{total_product}</h1>
          <FaPlus
            className="cursor-pointer"
            onClick={() => {
              api
                .put(`/cart/update/${id}`, {
                  id_user: localStorage.getItem("id"),
                  id_product: id_product,
                  total_product: parseInt(total_product) + 1,
                })
                .then((res) => {
                  if (res.status === 404) {
                    alert(res.msg);
                  } else {
                    window.location.reload();
                  }
                });
            }}
          />
        </div>
      </div>
      <div className="w-1/5">
        <h1 className="text-base text-center font-extrabold tracking-wider">
          Rp
          {(parseInt(price) * parseInt(total_product)).toLocaleString("id-ID")}
        </h1>
      </div>
    </div>
  );
}