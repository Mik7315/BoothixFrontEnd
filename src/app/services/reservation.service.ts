import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Reservation } from "../model/reservation";
import { ReservationClose } from "../model/reservation-close";

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

  close(reservationClose: ReservationClose): Observable<any> {
    return this.http.put(this.reservationPath + '/close', reservationClose);
  }

  cancel(id: Number): Observable<any> {
    return this.http.put(this.reservationPath + '/cancel/' + id, null);
  }

  deleteById(id: Number): Observable<any> {
    return this.http.delete(`${this.reservationPath}/${id}`);
  }
}
