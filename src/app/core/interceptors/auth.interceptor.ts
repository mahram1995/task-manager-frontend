import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";

import { Router } from "@angular/router";
import { Observable, EMPTY, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
/**
 * AuthInterceptor
 *
 * Automatically attaches the JWT token to outgoing HTTP requests.
 * Checks token availability and expiration before sending requests.
 * Redirects users to the login page when the token is missing,
 * expired, or rejected by the backend (HTTP 401).
 *
 * Public authentication APIs such as login and registration
 * are excluded from token validation.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Public APIs should not require authentication
    const isPublicUrl =
      req.url.includes("/api/auth/login") ||
      req.url.includes("/api/auth/register");

    if (isPublicUrl) {
      return next.handle(req);
    }

    const token = this.auth.token;

    // Token not available
    if (!token) {
      this.redirectToLogin();
      return EMPTY;
    }

    // Token expired
    if (this.isTokenExpired(token)) {
      this.redirectToLogin();
      return EMPTY;
    }

    // Attach JWT token
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Session expired or token invalid on backend
        if (error.status === 401) {
          this.redirectToLogin();
        }

        return throwError(() => error);
      }),
    );
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = token.split(".")[1];

      if (!payload) {
        return true;
      }

      const decodedPayload = JSON.parse(
        atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
      );

      if (!decodedPayload.exp) {
        return true;
      }

      // JWT exp is expressed in seconds
      return decodedPayload.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }

  private redirectToLogin(): void {
    this.auth.logout();
  }
}
