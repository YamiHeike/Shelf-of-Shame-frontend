import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

axios.defaults.baseURL = "https://localhost:8080";
axios.defaults.headers.post["Content-type"] = "application/json";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token: string) => {
  window.localStorage.setItem("auth_token", token);
};

export const request = <T, D = undefined>(
  method: HttpMethod,
  url: string,
  data?: D
): Promise<AxiosResponse<T>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = getAuthToken();
  if (authToken && authToken !== "null") {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const config: AxiosRequestConfig<D> = {
    method,
    headers,
    url,
    ...(method !== "GET" && method !== "DELETE" && { data }),
  };
  return axios(config);
};
