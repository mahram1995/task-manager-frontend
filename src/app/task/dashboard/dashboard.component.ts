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
  urlSearchMap: Map<string, any> = new Map();

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.fetchTask();
  }

  fetchTask() {
    this.taskService.fetchTask(this.urlSearchMap).subscribe((data) => {
      this.tasks = data.content;
      this.total = data.totalElements;
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

}
