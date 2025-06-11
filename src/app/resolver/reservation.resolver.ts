import { ResolveFn } from '@angular/router';
import { ReservationService } from "../services/reservation.service";
import { inject } from "@angular/core";
import { Reservation } from "../model/reservation";

export const reservationResolver: ResolveFn<Reservation | null> = (route) => {
  const reservationService = inject(ReservationService);
  const reservationId = route.params['idReservation'];

  if (!!reservationId) {
    return reservationService.getById(reservationId);
  } else {
    return null;
  }
};
