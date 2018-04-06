export interface Response<T> {
  data: T;
}

export interface PageResponse<T> extends Response<T> {
  page: number;
  // per_page;
  total: number;
}
