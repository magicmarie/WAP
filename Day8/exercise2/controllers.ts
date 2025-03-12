import { RequestHandler } from 'express';
import { getArray, saveArray } from './localStorage';

// Get all numbers
export const getNumbers: RequestHandler<unknown, Number[], unknown> = (req, res, next) => {
    console.log(req.url,req.method, "qwerty");
    res.json(getArray());
};

// Add a number
export const addNumber: RequestHandler<{ n: string }, { message: string, myArray: number[] }> = (req, res, next) => {
    try {
      const { n } = req.params;
      const myArray = getArray();
      myArray.push(parseInt(n));
      saveArray(myArray);

      res.json({ message: 'Number added successfully', myArray });
    } catch (error) {
        next(error);
    }
};

// Update a number at a specific index
export const putNumber: RequestHandler<{ index: string, n: string }, { message: string, myArray: number[] }> = (req, res, next) => {
    try {
        const { index, n } = req.params;
        const myArray = getArray();

        const idx = parseInt(index);
        const number = parseInt(n);
        if (isNaN(idx) || idx < 0 || idx >= myArray.length || typeof number !== 'number') {
            throw new Error('Invalid index or input.');
        }

        myArray[idx] = number;
        saveArray(myArray);

        res.json({ message: 'Number updated successfully', myArray });
    } catch (error) {
        next(error);
    }
};

// Delete a number by index
export const deleteNumber: RequestHandler<{ n: string }, { message: string, myArray: number[] }> = (req, res, next) => {
    try {
        const { n } = req.params;
        const myArray = getArray();

        const idx = parseInt(n);
        console.log(idx, "qwerty");
        if (isNaN(idx) || idx < 0 || idx >= myArray.length) {
            throw new Error('Invalid index.');
        }

        myArray.splice(idx, 1);
        saveArray(myArray);

        res.json({ message: 'Number deleted successfully', myArray });
    } catch (error) {
        next(error);
    }
};

export const getNumber: RequestHandler<{ index: string }, {message: string, number: number }> = (req, res, next) => {
  try {
    const { index } = req.params;
    const myArray = getArray();

    const idx = parseInt(index);
    if (isNaN(idx) || idx < 0 || idx >= myArray.length) {
      throw new Error('Invalid index.');
    }

    const number = myArray[idx];
    res.json({message: `Value at index ${index} found`, number})

  } catch (error) {
    next(error);
  }
}
