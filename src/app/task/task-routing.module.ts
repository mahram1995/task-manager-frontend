import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { TaskNoteComponent } from "./task-note/task-note.component";
import { AuthGuard } from "../core/guards/auth.guard";
const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  { path: "tasks", component: TaskListComponent ,canActivate: [AuthGuard]},
  { path: "tasks/create", component: TaskFormComponent ,canActivate: [AuthGuard]},
  { path: "tasks/edit/:taskId", component: TaskFormComponent ,canActivate: [AuthGuard]},
  { path: "tasks/details/:taskId", component: TaskDetailsComponent,canActivate: [AuthGuard] },
  { path: "tasks/notes/:taskId", component: TaskNoteComponent ,canActivate: [AuthGuard]},
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TaskRoutingModule {}
