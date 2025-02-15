import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:8080";
axios.defaults.headers.post["Content-type"] = "application/json";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestOptions<T> = {
  method: HttpMethod;
  url: string;
  data?: T;
};

export const request = <T, D = undefined>(
  method: HttpMethod,
  url: string,
  data?: D
): Promise<AxiosResponse<T>> => {
  const config: RequestOptions<D> = {
    method,
    url,
    ...(method !== "GET" && method !== "DELETE" && { data }),
  };
  return axios(config);
};
