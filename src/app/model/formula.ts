import { Device } from "./device";

export class Formula {
  idFormula?: number;
  name?: string;
  description?: string;
  price?: number;
  device?: Device;

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
