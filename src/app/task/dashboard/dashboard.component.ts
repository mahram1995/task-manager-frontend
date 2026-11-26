import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Task } from "../../core/models";
import { TaskService } from "../service/task.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  total = 0;
  pending = 0;
  progress = 0;
  completed = 0;
  delayed = 0;
  high = 0;
  constructor(
    private api: TaskService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.api.list({}, 0, 20).subscribe((r) => {
      this.tasks = r.content;
      this.total = r.totalElements;
      this.pending = this.tasks.filter((t) => t.devStatus === "PENDING").length;
      this.progress = this.tasks.filter(
        (t) => t.devStatus === "IN_PROGRESS",
      ).length;
      this.completed = this.tasks.filter(
        (t) => t.devStatus === "COMPLETED",
      ).length;
      this.delayed = this.tasks.filter(
        (t) => t.deliveryStatus === "DELAYED",
      ).length;
      this.high = this.tasks.filter(
        (t) => t.priority === "HIGH" || t.priority === "CRITICAL",
      ).length;
    });
  }
  go() {
    this.router.navigate(["/tasks"]);
  }
  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    this.router.navigate(["/login"]);
  }
}
