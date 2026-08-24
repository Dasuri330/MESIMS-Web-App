export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  user_id: number;
  email: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}
