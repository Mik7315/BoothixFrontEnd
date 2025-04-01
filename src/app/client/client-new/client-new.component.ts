import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ClientServiceService} from "../../services/client-service.service";
import {Client} from "../../model/client";
import {Address} from "../../model/address";
import {ClientTypeEnum} from "../../model/client-type-enum";

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.scss']
})
export class ClientNewComponent {
  private clientServiceService = inject(ClientServiceService);
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

    let client = new Client({
      type: ClientTypeEnum.PRIVATE,
      firstName: firstName,
      lastName: name,
      phoneNumber: phoneNumber,
      email: email,
      address: new Address({
        street: street,
        houseNumber: houseNumber,
        box: box,
        city: city,
        zipCode: zipCode,
        country: country
      })
    })

    this.clientServiceService.createClient(client).subscribe();
  }
}
