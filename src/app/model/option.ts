export class Option {
  idOption?: number;
  name?: string;
  description?: string;
  price?: number;

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
