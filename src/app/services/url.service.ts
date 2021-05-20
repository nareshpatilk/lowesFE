import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StandardResponseUrl, StandardResponseUrlPagination } from '../models/standard-response-url.model';

const baseUrl = 'http://localhost:9001/lowes';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/findAll`, { params });
  }

  pagination(page: any, pageSize: any): Observable<StandardResponseUrlPagination> {
    return this.http.get<StandardResponseUrlPagination>(`${baseUrl}/pagination/${page}/${pageSize}`);
  }

  updateCount(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  saveUrl(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/url/save`, data);
  }


}
