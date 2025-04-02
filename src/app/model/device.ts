import {DeviceTypeEnum} from "./device-type-enum";

export class Device {
  idClient?: number;
  name?: string;
  description?: string;
  type?: DeviceTypeEnum;

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
