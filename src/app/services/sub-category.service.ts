import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from 'src/app/models/subCategory';

const routerApi = "SubCategory";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  url = 'https://localhost:5001/api';
  constructor(private http: HttpClient) { }

  GetByAll(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.url}/${routerApi}/GetByAll`);
  }

  GetById(Id: number): Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.url}/${routerApi}/GetById/${Id}`);
  }

  Add(subCategory: SubCategory): Observable<any> {
    return this.http.post<SubCategory>(`${this.url}/${routerApi}/Add`, subCategory, httpOptions);
  }

  edit(subCategory: SubCategory): Observable<any> {
    return this.http.put<SubCategory>(`${this.url}/${routerApi}/Edit`, subCategory, httpOptions);
  }

  Delete(Id: number): Observable<any> {
    return this.http.delete<number>(`${this.url}/${routerApi}/Delete/${Id}`, httpOptions);
  }
}
