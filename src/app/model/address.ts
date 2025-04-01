export class Address{
  street?: string;
  houseNumber?: string;
  box?: string;
  city?: string;
  zipCode?: string;
  country?: string;

  constructor(obj?: any) {
    if (!obj){
      return;
    }
    Object.assign(this, obj);
  }
}
