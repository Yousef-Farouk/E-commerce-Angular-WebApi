import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  constructor(private http:HttpClient,@Inject(BASE_URL) private baseUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(itemId: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${itemId}`);
  }

  addItem(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  editItem(itemId: number, item: T): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${itemId}`, item);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${itemId}`);
  }
}