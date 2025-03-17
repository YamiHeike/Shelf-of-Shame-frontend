export type HttpState<T> =
  | {
      loading: true;
      data: null;
      error: false;
    }
  | {
      loading: false;
      data: T;
      error: false;
    }
  | {
      loading: false;
      data: null;
      error: true;
    }
  | {
      loading: false;
      data: null;
      error: false;
    };
