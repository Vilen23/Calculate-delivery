import {  Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (statusCode: number, message: string, res: Response): void => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  console.log(error);
  
  res.status(statusCode).json({ error: message });
};

export { errorHandler };
