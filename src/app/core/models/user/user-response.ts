export interface UserDataResponse {
  name: string;
  email: string;
  role: string;
}

export interface AuthResponseData {
  message: string;
  user: UserDataResponse;
  token?: string;
}
