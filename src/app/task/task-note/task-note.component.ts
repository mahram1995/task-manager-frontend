import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../service/task.service";
import { Note, Task } from "../../core/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonService } from "../../core/services/common.service";
import { NotificationService } from "../../core/services/notification.service";
@Component({
  selector: "app-task-note",
  templateUrl: "./task-note.component.html",
  styleUrls: ["./task-note.component.css"],
})
export class TaskNoteComponent implements OnInit {
  taskId = 0;
  notes: Note[] = [];
  note = "";
  noteForm: FormGroup;

  requiredfield: any = {
    description: "Descritpion",
  };

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.taskId = +(this.route.snapshot.paramMap.get("id") || 0);
    this.geNotesById(this.taskId);
    this.preparedNoteForm(new Note)
  }

  geNotesById(taskId) {
    this.taskService.fetchNotesById({ taskId: taskId }).subscribe((data) => {
      this.notes = data;
    });
  }

  preparedNoteForm(data: any) {
    this.noteForm = this.formBuilder.group({
      id: [data?.id ?? ""],
      description: [data?.description ?? "", [Validators.required]],
      noteDate: [data?.noteDate ?? 0],
    });
  }

  save() {
    let formData = this.noteForm.getRawValue();
    if (this.commonService.isFormInvalid(this.noteForm, this.requiredfield)) {
      return;
    }
    this.taskService.createNote(formData, null).subscribe((response) => {
      this.notificationService.sendSuccess("Task Add Successfully");

      this.router.navigate(["/tasks"]);
    });
    // const request =   this.id !== null ? this.api.update(this.id, v) : this.api.create(v);
    // request.subscribe(() => this.router.navigate(["/tasks"]));
  }

  remove(n: Note) {
    // if (confirm("Delete this note?"))   this.api.deleteNote(this.id, n.id).subscribe(() => this.load());
  }

  back() {
    this.router.navigate(["/tasks/details", this.taskId]);
  }
}
