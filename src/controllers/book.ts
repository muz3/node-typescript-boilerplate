import { Request, Response } from 'express';

export const getBooks = (_req: Request, _res: Response) => {
  _res.send({ book1: 'sample book', book2: 'another sample book' });
};
