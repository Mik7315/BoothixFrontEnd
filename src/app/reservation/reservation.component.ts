import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from "../services/reservation.service";
import { Reservation } from "../model/reservation";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  private reservationService = inject(ReservationService);
  displayedColumns: string[] = ['id', 'name', 'price', 'more'];
  reservations: Reservation[] = [];

  ngOnInit() {
    this.getAllReservations();
  }

  getAllReservations() {
    this.reservationService.getAll().subscribe(x => {
      this.reservations = x;
    });
  }

  deleteReservation(reservationToDelete: Reservation) {
    console.log(reservationToDelete);
    //Modifier un champ en DB en supprimer
  }

}
