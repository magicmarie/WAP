import { useState } from "react";
import SingleProduct from "../SingleProduct"

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const initialProducts: Product[] = [
  { id: 1, name: "Apple", price: 1, inStock: true },
  { id: 2, name: "Banana", price: 1, inStock: false },
  { id: 3, name: "Cherry", price: 2, inStock: true },
];

function ProductsList() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Toggle Stock Status
  const toggleStock = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, inStock: !product.inStock } : product
      )
    );
  };

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <SingleProduct key={product.id} {...product} toggleStock={toggleStock} />
      ))}
    </div>
  );
}

export default ProductsList;
