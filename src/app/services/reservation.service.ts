import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Reservation } from "../model/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationPath: string;

  constructor(private http: HttpClient) {
    this.reservationPath = 'http://localhost:8080/api/reservation'
  }

  createReservation(reservation: Reservation) : Observable<any> {
    return this.http.post(this.reservationPath, reservation);
  }

  updateReservation(reservation: Reservation): Observable<any> {
    return this.http.put(this.reservationPath, reservation);
  }

  getAll(): Observable<Reservation[]> {
    return this.http.get<Array<Reservation>>(this.reservationPath);
  }

  getById(id: Number) : Observable<Reservation> {
    return this.http.get(`${this.reservationPath}/${id}`);
  }
}
