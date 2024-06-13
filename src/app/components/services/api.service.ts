// import { HttpClient } from '@angular/common/http';
// import { Injectable,Inject } from '@angular/core';
// import { Observable } from 'rxjs';
// import { BASE_URL } from '../tokens/tokens/app-tokens.token';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService<T> {

//   constructor(private http:HttpClient,@Inject(BASE_URL) private baseUrl: string) {}

//   getAll(): Observable<T[]> {
//     return this.http.get<T[]>(this.baseUrl);
//   }

//   getById(itemId: number): Observable<T> {
//     return this.http.get<T>(`${this.baseUrl}/${itemId}`);
//   }

//   addItem(item: T): Observable<T> {
//     return this.http.post<T>(this.baseUrl, item);
//   }

//   editItem(itemId: number, item: T): Observable<T> {
//     return this.http.patch<T>(`${this.baseUrl}/${itemId}`, item);
//   }

//   deleteItem(itemId: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${itemId}`);
//   }
// }

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';


@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl).pipe(
      tap(data => {
        console.log("fetched data");
        this.dataSubject.next(data)})
    );
  }

  getById(itemId: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${itemId}`);
  }

  addItem(item: any): Observable<T> {
    return this.http.post<T>(this.baseUrl, item).pipe(
      tap(() => this.refreshData())
    );
  }

  editItem(itemId: number, item: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${itemId}`, item).pipe(
      tap(() => this.refreshData())
    );
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${itemId}`).pipe(
      tap(() => this.refreshData())
    );
  }

  private refreshData() {
    this.getAll().subscribe();
  }
}
