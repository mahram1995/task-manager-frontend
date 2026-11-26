import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouteHistoryService } from "./core/services/RouteHistoryService ";
import { AuthService } from "./core/services/auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  isSidebarOpen = true;

  constructor(
    private router: Router,
    private routeHistory: RouteHistoryService,
    public auth: AuthService,
  ) {
    window.addEventListener("storage", (event) => {
      // when user logout in any tab than all opening tab will route to login page
      // When user login in any tab then all opening login page tab will route to previous page automaticaly
      // this can be manageable by a configuration.
      if (event.key === "jwt") {
        if (event.newValue) {
          this.router.navigateByUrl(this.routeHistory.getLastRoute());
        } else {
          this.router.navigate(["/login"]);
        }
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
