import React, { useContext } from "react";
import { Button } from "./index";
import { ViewIcon } from "lucide-react";
import { AllContext } from "./AllContext";

export default function ProductCard({ openProduct }) {
  const { products } = useContext(AllContext);

  return (
    <div className="w-80 h-96 flex flex-col items-center justify-between mb-5 shadow-sm">
      {products?.map((product) => (
        <div key={product.id} className="w-full">
          <img
            src={product.imageurl}
            alt={`${product.series_name} image`}
            className="w-full h-56 object-contain"
          />

          <div className="px-5 pb-5">
            <p className="text-sm font-[400] mb-4">{product.series_name}</p>

            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold mt-2">
                ₹ {product.price.toLocaleString("en-IN")}
              </p>
              <Button
                onClick={() => openProduct(product.id)}
                type="button"
                className="w-1/2 flex items-center justify-center py-2.5"
              >
                <ViewIcon size={20} className="mr-2" />
                View
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
