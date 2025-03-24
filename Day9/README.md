[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/o7L4-tnE)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18636210)
## CS472-Homework-09-React
Create a React application that displays a list of products. Each product should have a `name`, `price`, and an `in stock` status. Users should be able to toggle the `inStock` status of a product by clicking a button. 

```typescript
interface Product { id: number, name: string, price: number, inStock: boolean; };
type State = Product[];

const initial_state: State = [
    { id: 1, name: 'Apple', price: 1, inStock: true },
    { id: 2, name: 'Banana', price: 1, inStock: false },
    { id: 3, name: 'Cherry', price: 2, inStock: true },
]
```

## Styling:
Install [Tailwindcss](https://tailwindcss.com/docs/guides/vite) and extend the `components` layer with the following styles:
```css
@layer components {
   .out-of-stock {
        @apply text-red-500;
    }
   .in-stock {
        @apply text-green-500;
    } 
}
```
## `App` Component
* The application container, which renders the `ProductsList` component.

## `ProductsList` Component:
* The list of products is declared within the `ProductsList` component state.
* Create the `ProductsList` component and display each product using a re-usable `Product` component.
* Each product should display its `name`, `price`, and `inStock` status.
* Use conditional rendering to display the product name in red if it is not in stock, and in green otherwise.

## `SingleProduct` Component:
* Create a `SingleProduct` component that displays an individual product.
* Use props spread to pass down the product data.
  
## Event Handling:
* Add a button to the `SingleProduct` component to toggle the in stock status of the product. Because all props are readonly, to change the state of a parent component from a child component, the parent component must pass down a function reference, when called it changes the state of the parent component.

Note: Solve the question in two different ways; first declare the state with `useState()`, later declare the state with `useReducer()`.
