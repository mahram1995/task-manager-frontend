import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../service/task.service";
import { TaskPayload } from "../../core/models";
import { FormBaseComponent } from "../../core/base-component/form.base.component";
import { CommonService } from "../../core/services/common.service";
import { Location } from "@angular/common";
import { NotificationService } from "../../core/services/notification.service";
@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"],
})
export class TaskFormComponent extends FormBaseComponent implements OnInit {
  required_field: any = {
    bankCode: "Bank Code",
    bankName: "Bank Name",
    countryCode: "Country",
  };
  id: number | null = null;
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private notificationService: NotificationService,
    protected override commonService: CommonService,
    protected override router: Router,
    protected override location: Location,
  ) {
    super(location, commonService);
  }
  ngOnInit() {
    this.preparedTaskForm(new TaskPayload());
  }

  preparedTaskForm(data: TaskPayload) {
    this.taskForm = this.fb.group({
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
  }

  save() {
    let formData = this.taskForm.getRawValue();
    if (this.commonService.isFormInvalid(this.taskForm, this.required_field)) {
      return;
    }

    this.taskService
      .createTask(formData, this.userlParams)
      .subscribe((response) => {
        this.notificationService.sendSuccess("Task Add Successfully");

        this.router.navigate(["/tasks"]);
      });
    // const request =   this.id !== null ? this.api.update(this.id, v) : this.api.create(v);
    // request.subscribe(() => this.router.navigate(["/tasks"]));
  }
  cancel() {
    this.router.navigate(["/tasks"]);
  }
}
