import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from "../services/reservation.service";
import { Reservation } from "../model/reservation";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

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
    MatSnackBarModule
  ]
})
export class ReservationComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'client', 'price', 'status', 'more'];
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
    if (!!reservationToDelete?.idReservation) {
      this.reservationService.deleteById(reservationToDelete.idReservation!).subscribe({
        next: value => {
          this.getAllReservations();
        },
        error: err => {
          this.snackBar.open('Une erreur s\'est produite', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      })
    }
  }

}
