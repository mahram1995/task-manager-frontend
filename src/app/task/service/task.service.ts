import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { BASE_URL } from "../../core/environment/environment";
import { Note, Page, Task, TaskPayload } from "../../core/models";
import { BaseService, PathParameters } from "../../core/services/base.service";
import { HttpService } from "../../core/services/http.service";
import { Observable } from "rxjs";

const API = BASE_URL + "api/tasks";

const FETCH_TASK = BASE_URL + "api/tasks/get-all";
const FETCH_TASK_BY_ID = BASE_URL + "api/tasks/get/{taskId}";
const DELETE_TASK_BY_ID = BASE_URL + "api/tasks/delete/{taskId}";
const CREATE_TASK = BASE_URL + "api/tasks/create";
const UPDATE_TASK = BASE_URL + "api/tasks/update";
const FETCH_NOTES_BY_TASK_ID = BASE_URL + "api/tasks/get-notes/{taskId}";
const CREATE_NOTE = BASE_URL + "api/tasks/create-note";
const UPDATE_NOTE = BASE_URL + "api/tasks/update-note";
@Injectable({ providedIn: "root" })
export class TaskService extends BaseService {
  constructor(
    private httpclient: HttpClient,
    private http: HttpService,
  ) {
    super();
  }

  public fetchTask(urlSearchParams): Observable<any> {
    return this.http.get(FETCH_TASK, { params: urlSearchParams });
  }

  public getTaskById(pathParameters: PathParameters): Observable<any> {
    let option = this.create(FETCH_TASK_BY_ID, pathParameters);
    return this.http.get(option);
  }

  public createTask(data: TaskPayload, urlSearchParams): Observable<any> {
    return this.http.post(CREATE_TASK, data, urlSearchParams);
  }

  public updateTask(data: TaskPayload, urlSearchParams): Observable<any> {
    return this.http.post(UPDATE_TASK, data, urlSearchParams);
  }

  public deleteTaskById(pathParameters: PathParameters): Observable<any> {
    let option = this.create(DELETE_TASK_BY_ID, pathParameters);
    return this.http.get(option);
  }

   public fetchNotesById(pathParameters: PathParameters): Observable<any> {
    let option = this.create(FETCH_NOTES_BY_TASK_ID, pathParameters);
    return this.http.get(option);
  }
  
  public createNote(data: Note, urlSearchParams): Observable<any> {
    return this.http.post(CREATE_NOTE, data, urlSearchParams);
  }

  public updateNote(data: Note, urlSearchParams): Observable<any> {
    return this.http.post(UPDATE_NOTE, data, urlSearchParams);
  }

  // notes(id: number) {
  //   return this.http.get<Note[]>(`${API}/${id}/notes`);
  // }
  // addNote(id: number, noteDescription: string) {
  //   return this.http.post<Note>(`${API}/${id}/notes`, { noteDescription });
  // }
  // deleteNote(id: number, noteId: number) {
  //   return this.http.delete<void>(`${API}/${id}/notes/${noteId}`);
 // }
  // list(filters: any, page = 0, size = 10, sort = "createDate,desc") {
  //   let p = new HttpParams()
  //     .set("page", page)
  //     .set("size", size)
  //     .set("sort", sort);

  //   Object.keys(filters).forEach((k) => {
  //     if (filters[k]) p = p.set(k, filters[k]);
  //   });
  //   return this.http.get<Page<Task>>(API, { params: p });
  // }

  // get(id: number) {
  //   return this.http.get<Task>(`${API}/${id}`);
  // }
  // create(v: TaskPayload) {
  //  // return this.http.post<Task>(API, v);
  // }

  // update(id: number, v: TaskPayload) {
  //   return this.http.put<Task>(`${API}/${id}`, v);
  // }
  // delete(id: number) {
  //   return this.http.delete<void>(`${API}/${id}`);
  // }
}
