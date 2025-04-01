import {ClientTypeEnum} from "./client-type-enum";
import {Address} from "./address";

export class Client {
  idClient?: number;
  type?: ClientTypeEnum;
  firstName?: string;
  lastName?: string;
  denomination?: string;
  vatNumber?: string;
  bceNumber?: string;
  phoneNumber?: string;
  email?: string;
  address?: Address;

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
