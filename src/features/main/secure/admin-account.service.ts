import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Role = 'TEACHER' | 'PARENT' | 'STUDENT';
export type AccountStatus = 'active' | 'suspended';

export interface Account {
  readonly id: number;
  readonly name: string;
  readonly role: Role;
  readonly email: string;
  readonly status: AccountStatus;
}

export interface CreateLoginRequest {
  role: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
}

export interface CreateLoginResponse {
  email: string;
  tempPassword: string;
}
@Injectable({ providedIn: 'root' })
export class AdminAccountService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000';

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/admin/users`);
  }

  createLogin(payload: CreateLoginRequest): Observable<CreateLoginResponse> {
    return this.http.post<CreateLoginResponse>(`${this.apiUrl}/admin/users`, payload);
  }
}
