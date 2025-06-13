import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from "../services/reservation.service";
import { Reservation } from "../model/reservation";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-reservation',
  standalone: true,
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  imports: [
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
  ]
})
export class ReservationComponent implements OnInit {
  private reservationService = inject(ReservationService);
  displayedColumns: string[] = ['name', 'client', 'price', 'more'];
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
