import { LocalStorage } from 'node-localstorage';

// Initialize localStorage with a directory
const localStorage = new LocalStorage('./scratch');

// Define a key for storing the array
const key = 'myArray';

// Function to get the array from localStorage
export const getArray = (): number[] => {
    const existingData = localStorage.getItem(key);
    return existingData ? JSON.parse(existingData) : [];
};

// Function to save the array back to localStorage
export const saveArray = (array: number[]): void => {
    localStorage.setItem(key, JSON.stringify(array));
};
