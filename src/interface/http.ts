export interface HttpReturn<T> {
  status: number;
  statusText: string;
  data: T;
}

export interface InsertReturn {
  insertId: string;
  isSuccess: boolean;
}
