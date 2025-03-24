import { Product } from "./types";

interface ProductProps extends Product {
  toggleStock: (id: number) => void;
}

function SingleProduct({ id, name, price, inStock, toggleStock }: ProductProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <p className={`text-lg font-semibold ${inStock ? "in-stock" : "out-of-stock"}`}>
        {name}
      </p>
      <p className="text-gray-600">Price: ${price}</p>
      <button
        type="button"
        onClick={() => toggleStock(id)}
        className={`mt-2 px-4 py-2 rounded-lg font-semibold text-white transition
          ${inStock ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}`}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
    </div>
  );
}

export default SingleProduct;
