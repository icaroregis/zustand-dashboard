import { AxiosError } from 'axios';
import { tesloApi } from '../api/tesloApi';
import { User } from '../interfaces';

export interface LoginResponse extends User {
  token: string;
}

export class AuthService {
  static readonly login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      console.log('🚀 ~ AuthService ~ login= ~ response:', data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Error during login:', error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log(error);
      throw new Error('An unexpected error occurred during login.');
    }
  };

  static readonly checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.get<LoginResponse>('/auth/check-status');
      console.log('🚀 ~ AuthService ~ checkStatus= ~ response:', data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Error during checkStatus:', error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log(error);
      throw new Error('An unexpected error occurred during checkStatus.');
    }
  };
}
