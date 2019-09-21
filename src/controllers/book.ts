import { Request, Response } from 'express';
// import { Book } from './../models/book';

export const getBooks = (_req: Request, _res: Response) => {
  _res.send({ book1: 'sample book', book2: 'another sample book' });
};

// export const setBook = async (_req: Request, _res: Response) => {
//   const book = new Book({ title: 'dfdf', content: 'conent' });
//   await book.save();
// };
