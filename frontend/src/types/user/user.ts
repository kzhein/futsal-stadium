export interface User {
  role: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface UserAuthState {
  token: null | string;
  isAuthenticated: boolean;
  loading: boolean;
  user: null | User;
  success: null | string;
  error: null | string;
}

export interface UserLoadState {
  loading: boolean;
  success: null | boolean;
  error: null | string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserSignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface UserUpdateData {
  name: string;
  phone: string;
}

export interface UserPasswordUpdateData {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}
