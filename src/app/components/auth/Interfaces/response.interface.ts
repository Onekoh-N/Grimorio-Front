import { UserData } from "./userData.interface";

export interface ResponseInterface {
  success: boolean;
  statusCode: number;
  message: string;
  error?: string;
  token?: string;
  userData?: UserData;
}
