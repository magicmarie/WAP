import { useReducer } from "react";
import SingleProduct from "../SingleProduct";
import { Product } from "../types";

type Action = { type: "TOGGLE_STOCK"; id: number };

const initialProducts: Product[] = [
  { id: 1, name: "Apple", price: 1, inStock: true },
  { id: 2, name: "Banana", price: 1, inStock: false },
  { id: 3, name: "Cherry", price: 2, inStock: true },
];

// Reducer function
function productReducer(state: Product[], action: Action): Product[] {
  switch (action.type) {
    case "TOGGLE_STOCK":
      return state.map((product) =>
        product.id === action.id ? { ...product, inStock: !product.inStock } : product
      );
    default:
      return state;
  }
}

function ProductsList() {
  const [products, dispatch] = useReducer(productReducer, initialProducts);

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <SingleProduct
          key={product.id}
          {...product}
          toggleStock={(id: number) => dispatch({ type: "TOGGLE_STOCK", id })}
        />
      ))}
    </div>
  );
}

export default ProductsList;
