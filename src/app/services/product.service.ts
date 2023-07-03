import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

const routerApi = "Product";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'https://localhost:5001/api';
  urlIbge = 'https://servicodados.ibge.gov.br/api/v1/paises/Brasil'
  constructor(private http: HttpClient) { }

  GetByAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${routerApi}/GetByAll`);
  }

  GetById(Id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${routerApi}/GetById/${Id}`);
  }

  getByKeyword(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${routerApi}/GetByKeyword/${search}`);
  }

  Add(product: Product): Observable<any> {
    return this.http.post<Product>(`${this.url}/${routerApi}/Add`, product, httpOptions);
  }

  edit(subCategory: Product): Observable<any> {
    return this.http.put<Product>(`${this.url}/${routerApi}/Edit`, subCategory, httpOptions);
  }

  Delete(Id: number): Observable<any> {
    return this.http.delete<number>(`${this.url}/${routerApi}/Delete/${Id}`, httpOptions);
  }

  UploadImage(file: any): Observable<any> {
    return this.http.post<any>(`${this.url}/${routerApi}/UploadImage`,file);
  }

  RestoreImage(id: number): Observable<string> {
    return this.http.get<string>(`${this.url}/${routerApi}/RestoreImage/${id}`);
  }
}
