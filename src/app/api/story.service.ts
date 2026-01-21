import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private baseUrl = 'https://mxpertztestapi.onrender.com/api/sciencefiction';

  constructor(private http: HttpClient) {}

  getStories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getStoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
