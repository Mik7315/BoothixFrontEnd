export class Stat {
  totalClient?: string;
  totalClientTitle?: string;
  totalReservation?: string;
  totalReservationTitle?: string;
  totalRevenus?: string;
  totalRevenusTitle?: string;
  totalRevenusExtra?: string;

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
