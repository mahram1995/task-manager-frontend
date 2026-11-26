import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { TaskRoutingModule } from "./task-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { TaskNoteComponent } from "./task-note/task-note.component";
@NgModule({
  declarations: [
    DashboardComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    TaskNoteComponent,
  ],
  imports: [SharedModule, TaskRoutingModule],
})
export class TaskModule {}
