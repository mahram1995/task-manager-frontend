import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import Aura from "@primeng/themes/aura";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { NavbarComponent } from "./core/topbar/navbar.component";
import { SidebarComponent } from "./core/sidebar/sidebar.component";
import { TaskService } from "./task/service/task.service";
import { HttpService } from "./core/services/http.service";
import { LoaderOverlayService } from "./core/services/loader.overlay.service";
import { CommonService } from "./core/services/common.service";
import { NotificationService } from "./core/services/notification.service";
import { MessageService } from "primeng/api";

@NgModule({
  declarations: [AppComponent, SidebarComponent, NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    TaskService,
    HttpService,
    LoaderOverlayService,
    CommonService,
    NotificationService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
