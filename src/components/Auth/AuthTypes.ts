export interface AuthCredentials {
  email: string;
  password: string;
}

export interface User extends AuthCredentials {
  username: string;
}
