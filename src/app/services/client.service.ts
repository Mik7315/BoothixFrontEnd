import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Client } from "../model/client";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientPath: string;

  constructor(private http: HttpClient) {
    this.clientPath = 'http://localhost:8080/api/client';
  }

  createClient(client: Client) : Observable<any> {
    return this.http.post(this.clientPath, client);
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put(this.clientPath, client);
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Array<Client>>(this.clientPath);
  }

  getById(id: Number) : Observable<Client> {
    return this.http.get(`${this.clientPath}/${id}`);
  }

  deleteById(id: Number): Observable<any> {
    return this.http.delete(`${this.clientPath}/${id}`);
  }
}
