import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

const routerApi = "Category";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'https://localhost:5001/api';
  constructor(private http: HttpClient) { }

  GetByAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/${routerApi}/GetByAll`);
  }

  GetById(Id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${routerApi}/GetById/${Id}`);
  }

  Add(subCategory: Category): Observable<any> {
    return this.http.post<Category>(`${this.url}/${routerApi}/Add`, subCategory, httpOptions);
  }

  edit(subCategory: Category): Observable<any> {
    return this.http.put<Category>(`${this.url}/${routerApi}/Edit`, subCategory, httpOptions);
  }

  Delete(Id: number): Observable<any> {
    return this.http.delete<number>(`${this.url}/${routerApi}/Delete/${Id}`, httpOptions);
  }
}
