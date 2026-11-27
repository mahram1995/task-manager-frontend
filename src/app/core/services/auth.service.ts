import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { Environment } from "../../core/environment/environment";

export const BASE_URL = Environment.BASE_URL;

const API = BASE_URL + "api";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    return this.http
      .post<{
        token: string;
        userName: string;
      }>(`${API}/auth/login`, { userName, password })
      .pipe(
        tap((r) => {
          localStorage.setItem("jwt", r.token);
          localStorage.setItem("userName", r.userName);
        }),
      );
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
  }

  get token(): string | null {
    return localStorage.getItem("jwt");
  }

  get loggedIn(): boolean {
    return !!this.token;
  }

  isTokenValid(): boolean {
    const token = this.token;

    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
