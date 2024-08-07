/** A limited result */
export type PagingResult<T> = {
  skip: number;
  total: number;
  data: T[];
};
