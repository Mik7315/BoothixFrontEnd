import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Stat } from "../model/stat";

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private statPath: string;

  constructor(private http: HttpClient) {
    this.statPath = 'http://localhost:8080/api/stat';
  }

  getAll(): Observable<Stat> {
    return this.http.get<Stat>(this.statPath);
  }

}
