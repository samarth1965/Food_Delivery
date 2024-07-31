import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../model/food';
import { FoodResponse } from '../model/food-response';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {
  private baseUrl = 'http://localhost:8081/api/food';

  constructor(private http:HttpClient) { }

  getPosts(): Observable<FoodResponse[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateFood(food:FoodResponse,foodId:number|null): Observable<Food> {
    const url = `${this.baseUrl}/${foodId}`
    return this.http.put<Food>(url,food);
  }
  createPost(postData: FormData): Observable<any> {
    const url = `${this.baseUrl}/create`
    return this.http.post<any>(url, postData);
  }
  deleteFood(foodId:number): Observable<any> {
    const url = `${this.baseUrl}/${foodId}`
     return this.http.delete<void>(url);
  }
}
