import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { RouteHistoryService } from "../../core/services/RouteHistoryService ";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    userName: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });
  error = "";
  loading = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private routeHistory: RouteHistoryService,
  ) {}
  ngOnInit(): void {
    if (this.auth.isTokenValid()) {
      this.router.navigateByUrl(this.routeHistory.getLastRoute());
    }
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = "";

    this.auth
      .login(this.form.value.userName!, this.form.value.password!)
      .subscribe({
        next: () => {
          const lastRoute =
            sessionStorage.getItem("lastVisitedRoute") || "/dashboard";

          this.router.navigateByUrl(lastRoute);
        },
        error: (e) => {
          this.error = e.error?.message || "Unable to login";
          this.loading = false;
        },
      });
  }
}
