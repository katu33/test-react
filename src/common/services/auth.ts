import { AxiosResponse } from "axios";
import instance from "../config/api";
import { IUser, IUserLogin } from "../interfaces/user";

interface IAuthService {
  login: (user: IUserLogin) => Promise<AxiosResponse<any>>;
  getUsers: () => Promise<AxiosResponse<IUser[]>>;
}

const AuthService: IAuthService = {
  login: (user): Promise<AxiosResponse<any>> => {
    return instance.post('login', user);
  },
  getUsers: (): Promise<AxiosResponse<IUser[]>> => {
    return instance.get('users');
  }
};

export default AuthService;