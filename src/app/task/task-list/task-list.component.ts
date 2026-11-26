import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Task } from "../../core/models";
import { TaskService } from "../service/task.service";
@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  rows: Task[] = [];
  total = 0;
  totalPages = 1;
  page = 0;
  size = 10;
  filters: any = {
    q: "",
    client: "",
    priority: "",
    devStatus: "",
    deliveryStatus: "",
  };
  constructor(
    private api: TaskService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.api.list(this.filters, this.page, this.size).subscribe((r) => {
      this.rows = r.content;
      this.total = r.totalElements;
      this.totalPages = r.totalPages || 1;
    });
  }
  search() {
    this.page = 0;
    this.load();
  }
  edit(t: Task) {
    this.router.navigate(["/tasks/edit", t.id]);
  }
  details(t: Task) {
    this.router.navigate(["/tasks/details", t.id]);
  }
  notes(t: Task) {
    this.router.navigate(["/tasks/notes", t.id]);
  }
  remove(t: Task) {
    if (confirm("Delete this task?"))
      this.api.delete(t.id).subscribe(() => this.load());
  }
  next(delta: number) {
    this.page = Math.max(
      0,
      Math.min(Math.ceil(this.total / this.size) - 1, this.page + delta),
    );
    this.load();
  }
  create() {
    this.router.navigate(["/tasks/create"]);
  }
}
