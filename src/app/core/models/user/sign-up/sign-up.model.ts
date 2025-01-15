import { UserResponse } from "../user-response";

export interface SignUpSendData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface SignUpResponseData {
  message: string;
  user: UserResponse;
  token: string;
}
