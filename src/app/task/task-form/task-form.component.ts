import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../core/services/task.service";
import { TaskPayload } from "../../core/models";
@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"],
})
export class TaskFormComponent implements OnInit {
  id: number | null = null;
  form = this.fb.group({
    taskName: ["", [Validators.required, Validators.maxLength(200)]],
    description: [""],
    client: [""],
    devStatus: ["PENDING"],
    expectedDeliveryDate: [""],
    deliveryDate: [""],
    expectedStartDate: [""],
    actualStartDate: [""],
    expectedEndDate: [""],
    actualEndDate: [""],
    priority: ["NORMAL"],
    deliveryStatus: ["PENDING"],
  });
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: TaskService,
  ) {}
  ngOnInit() {
    const v = this.route.snapshot.paramMap.get("id");
    if (v) {
      this.id = +v;
      this.api
        .get(this.id)
        .subscribe((t) =>
          this.form.patchValue({
            ...t,
            expectedDeliveryDate: t.expectedDeliveryDate || "",
            deliveryDate: t.deliveryDate || "",
            expectedStartDate: t.expectedStartDate || "",
            actualStartDate: t.actualStartDate || "",
            expectedEndDate: t.expectedEndDate || "",
            actualEndDate: t.actualEndDate || "",
          } as any),
        );
    }
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue() as unknown as TaskPayload;
    const request =
      this.id !== null ? this.api.update(this.id, v) : this.api.create(v);
    request.subscribe(() => this.router.navigate(["/tasks"]));
  }
  cancel() {
    this.router.navigate(["/tasks"]);
  }
}
