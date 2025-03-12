import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(400).json({
        error: err.message || 'Something went wrong',
    });
};
