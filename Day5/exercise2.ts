// Using Fetch API, write functions that implement the following CRUD operations
// on the products API from https://dummyjson.com/products:
import { Product } from "./interfaces";

const API_URL = 'https://dummyjson.com/products';
// Get all products: get_products(skip: number = 0, limit: number = 30)
// Print list of product titles only, with pagination (30 products each page).
// Use limit and skip query parameters.

function get_products(skip: number = 0, limit: number = 30): void {
  fetch(`${API_URL}?skip=${skip}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      data.products.forEach((product: any) => {
        console.log(product.title);
      });
    })
    .catch(error => {
      console.error("Failed to fetch products:", error);
    });
}

// async/await version
async function get_products1(skip: number = 0, limit: number = 30): Promise<void> {
  try{
    const response = await fetch(`${API_URL}?skip=${skip}&limit=${limit}`);
    const data = await response.json();

    data.products.forEach((product: any) => {
      console.log(product.title);
    });
  }
  catch(error) {
    console.error("Failed to fetch products:", error);
  }
}

// Get a single product: get_product(id: number)
// Print JSON with {title, description, category, price}.
function get_product(id: number) {
  fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(product => {
      console.log(product);
    })
    .catch(error => {
      console.error("Failed to fetch product:", error);
    });
}

// async/await version
async function get_product1(id: number) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();
    console.log(product);
  }
  catch(error) {
    console.error("Failed to fetch product:", error);
  }
}

// Add a new product: add_product(product: Partial<Product>)
// return {ok: boolean}
function add_product(product: Partial<Product>): void {
  fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(data => {
      console.log({ ok: true });
    })
    .catch(error => {
      console.error("Failed to add product:", error);
    });
}

// async/await version
async function add_product1(product: Partial<Product>) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    const data = await response.json();
    console.log(data);
    return { ok: true }
  }
  catch(error) {
    console.error("Failed to add product:", error);
  }
}

// Update a product title: update_product_title(id: number, new_title: string)
// return {ok: boolean}
function update_product_title(id: number, new_title: string) {
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: new_title })
  })
    .then(response => response.json())
    .then(() => {
      console.log({ ok: true });
    })
    .catch(error => {
      console.error("Failed to update product title:", error);
    });
}

// async/await version
async function update_product_title1(id: number, new_title: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: new_title })
    });
    const data = await response.json();
    console.log(data);
  }
  catch(error) {
    console.error("Failed to update product title:", error);
  }
}

// Delete a product: delete_product(id: number) return {ok: boolean}
function delete_product(id: number): void {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => {
      console.log({ ok: true });
    })
    .catch(error => {
      console.error("Failed to delete product:", error);
    });
}

// async/await version
async function delete_product1(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (data.ok) {
      console.log({ ok: true });
    }
  }
  catch(error) {
    console.error("Failed to delete product:", error);
  }
}

console.log('Get all products');
get_products();
get_products1();

console.log('Get a single product');
get_product(1);
get_product1(1);

console.log('Add a new product');
add_product({
  title: 'New Product',
  description: 'New Product Description',
  category: 'New Category',
  price: 100
});
add_product1({
  title: 'New new Product',
  description: 'New new Product Description',
  category: 'New new Category',
  price: 200
});

console.log('Update a product title');
update_product_title(1, 'Updated Product Title');
update_product_title1(1, 'Updated Product product Title');

console.log('Delete a product');
delete_product(1);
delete_product1(1);
