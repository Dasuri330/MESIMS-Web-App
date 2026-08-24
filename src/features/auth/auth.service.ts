import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LoginRequest,
  LoginResponse,
} from './auth.model';

interface RawLoginResponse {
  access_token: string;
  token_type: string;
  role: string;
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8000';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<RawLoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        map((raw) => ({
          access_token: raw.access_token,
          token_type: raw.token_type,
          user: {
            user_id: raw.user_id,
            email: raw.email,
            first_name: raw.first_name,
            last_name: raw.last_name,
            role: raw.role,
          },
        })),
      );
  }
}
