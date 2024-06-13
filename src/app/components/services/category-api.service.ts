import { BASE_URL } from './../tokens/tokens/app-tokens.token';
import { Icategory } from './../models/icategory';
import { Inject, Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryApiService extends ApiService<Icategory> {

  constructor(http:HttpClient,@Inject(BASE_URL) baseUrl :string) {

      super(http,"https://localhost:7237/api/Category")
  }
}
