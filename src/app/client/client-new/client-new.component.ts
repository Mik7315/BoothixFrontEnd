import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.scss']
})
export class ClientNewComponent {
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.group({
    name: new FormControl(''),
    firstName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    street: new FormControl(''),
    houseNumber: new FormControl(''),
    box: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl('')
  });

  save(){
    const name = this.formGroup.controls.name.value;
    const firstName = this.formGroup.controls.firstName.value;
    const phoneNumber = this.formGroup.controls.phoneNumber.value;
    const email = this.formGroup.controls.email.value;
    const street = this.formGroup.controls.street.value;
    const houseNumber = this.formGroup.controls.houseNumber.value;
    const box = this.formGroup.controls.box.value;
    const zipCode = this.formGroup.controls.zipCode.value;
    const city = this.formGroup.controls.city.value;
    const country = this.formGroup.controls.country.value;

    console.log(name);
    console.log(firstName);
    console.log(phoneNumber);
    console.log(email);
  }
}
