import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IReview } from '../models/Ireview';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReviewService extends ApiService<IReview> {

  constructor(http:HttpClient,@Inject(BASE_URL) baseUrl:string ) {

    super(http,"https://localhost:7237/api/review")
  }

  getProductReviews(itemId: number): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.baseUrl}/${itemId}`);
  }
}
