export class Formula {
  idFormula?: number;
  name?: string;
  description?: string;
  price?: number;
  idDevice?: number

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
