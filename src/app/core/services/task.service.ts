import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Task, TaskPayload, Note, Page } from "../models";
import { BASE_URL } from "../environment/environment";
const API = BASE_URL + "api/tasks";
@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private http: HttpClient) {}
  list(filters: any, page = 0, size = 10, sort = "createDate,desc") {
    let p = new HttpParams()
      .set("page", page)
      .set("size", size)
      .set("sort", sort);

    Object.keys(filters).forEach((k) => {
      if (filters[k]) p = p.set(k, filters[k]);
    });
    return this.http.get<Page<Task>>(API, { params: p });
  }

  get(id: number) {
    return this.http.get<Task>(`${API}/${id}`);
  }
  create(v: TaskPayload) {
    return this.http.post<Task>(API, v);
  }
  update(id: number, v: TaskPayload) {
    return this.http.put<Task>(`${API}/${id}`, v);
  }
  delete(id: number) {
    return this.http.delete<void>(`${API}/${id}`);
  }

  notes(id: number) {
    return this.http.get<Note[]>(`${API}/${id}/notes`);
  }
  addNote(id: number, noteDescription: string) {
    return this.http.post<Note>(`${API}/${id}/notes`, { noteDescription });
  }
  deleteNote(id: number, noteId: number) {
    return this.http.delete<void>(`${API}/${id}/notes/${noteId}`);
  }
}
