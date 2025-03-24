import ProductsList from './useState/ProductList';
import ProductsList1 from './useReducer/ProductList';
import './App.css';

function App() {
  return (
    <div className="p-6 mx-auto flex">
      <div className='border p-4 rounded-lg shadow-md mr-8'>
        <h1 className="text-xl font-bold m-4">UseState Product List</h1>
        <ProductsList />
      </div>

      <div className='border p-4 rounded-lg shadow-md'>
        <h1 className="text-xl font-bold m-4">UseReducer Product List</h1>
        <ProductsList1 />
      </div>
    </div>
  );
}

export default App;
