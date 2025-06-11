import { Address } from "./address";
import { ReservationStatusEnum } from "./reservation-status-enum";
import { Client } from "./client";
import { Option } from "./option";
import { Formula } from "./formula";

export class Reservation {
  idReservation?: number;
  phoneNumber?: string;
  address?: Address;
  status?: ReservationStatusEnum;
  eventDate?: string; // ISO string: "2025-06-11T15:00:00"
  eventTime?: string;
  installationDate?: string;
  installationTime?: string;
  pickUpDate?: string;
  pickUpTime?: string;
  deliveryCost?: number;
  discount?: number;
  totalPrice?: number;
  deposit?: number;
  comment?: string;
  galleryLink?: string;
  client?: Client;
  options?: Option[];
  formulas?: Formula[];

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
