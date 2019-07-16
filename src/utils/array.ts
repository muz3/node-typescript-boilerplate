import { StringAnyMap, StringTMap } from '@src/types/utils';

export function groupBy<T>(list: T[], func: (item: T) => string | boolean): StringTMap<T[]> {
  return list.reduce(
    (accumulate, item) => {
      const key = String(func(item));
      (accumulate[key] = accumulate[key] || []).push(item);
      return accumulate;
    },
    {} as StringAnyMap
  );
}
