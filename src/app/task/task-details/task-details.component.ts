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
    private taskService: TaskService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const taskId = params.get("taskId");

      if (taskId) {
        this.getTaskById(Number(taskId));
      }
    });
  }

  back() {
    this.router.navigate(["/tasks"]);
  }

  notes() {
    this.router.navigate(["/tasks/notes", this.task?.id]);
  }

  getTaskById(taskId) {
    this.taskService.getTaskById({ taskId: taskId }).subscribe((data) => {
      this.task = data;
    });
  }
}
