export interface AuthCredentials {
  email: string;
  password: string;
}

export interface User extends AuthCredentials {
  username: string;
}

export type UserDto = {
  id: number;
  email: string;
  username: string;
  token: string;
};
