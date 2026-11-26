import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../service/task.service";
import { Task } from "../../core/models";
@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.css"],
})
export class TaskDetailsComponent implements OnInit {
  task?: Task;
  constructor(
    private route: ActivatedRoute,
    private api: TaskService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.api
      .get(+(this.route.snapshot.paramMap.get("id") || 0))
      .subscribe((t) => (this.task = t));
  }
  back() {
    this.router.navigate(["/tasks"]);
  }
  notes() {
    this.router.navigate(["/tasks/notes", this.task?.id]);
  }
}
