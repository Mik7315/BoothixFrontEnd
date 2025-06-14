export class ReservationClose {
  idReservation?: number;
  galleryLink?: string;

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
