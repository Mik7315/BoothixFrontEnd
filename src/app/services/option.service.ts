import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Option } from "../model/option";


@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private optionPath: string;

  constructor(private http: HttpClient) {
    this.optionPath = 'http://localhost:8080/api/option';
  }

  createOption(option: Option): Observable<any> {
    return this.http.post(this.optionPath, option);
  }

  updateOption(option: Option) : Observable<any> {
    return this.http.put(this.optionPath, option);
  }

  getAll(): Observable<Option[]> {
    return this.http.get<Array<Option>>(this.optionPath);
  }

  getById(id: Number) : Observable<any> {
    return this.http.get(`${this.optionPath}/${id}`);
  }
}
