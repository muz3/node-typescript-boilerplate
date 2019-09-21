import { Request, Response } from 'express';
import { CrimeData, ICrimeData } from './../models/CrimeData';

export const getData = async (_req: Request, _res: Response) => {
  CrimeData.find(
    { _id: '5d83fcf0a77566444aee6836' },
    (err: Error, data: ICrimeData[]) => {
      if (err) {
        console.log('err===');
        throw Error('err');
      }
      console.log('======');
      console.log('data', data);
      return _res.send({ data: data });
    },
  );
};
