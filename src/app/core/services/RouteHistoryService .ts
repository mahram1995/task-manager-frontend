import { Injectable } from '@angular/core';
import {
  Router,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteHistoryService {

  private readonly ROUTE_KEY = 'lastVisitedRoute';

  constructor(private router: Router) {
    // here store the last roue of each page 
    // when user logout in a page and login again then user navite to previous page
    // using last route.

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd,
        ),
      )
      .subscribe((event) => {

        const route = event.urlAfterRedirects;

        if (!route.startsWith('/login')) {
          sessionStorage.setItem(this.ROUTE_KEY, route);
        }

      });
  }

  getLastRoute(): string {
    return sessionStorage.getItem(this.ROUTE_KEY) || '/dashboard';
  }
}