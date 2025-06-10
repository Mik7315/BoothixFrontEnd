import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ClientService } from "../../services/client.service";
import { Client } from "../../model/client";
import { Address } from "../../model/address";
import { ClientTypeEnum } from "../../model/client-type-enum";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.scss']
})
export class ClientNewComponent implements OnInit{
  private clientService = inject(ClientService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  client?: Client;

  formGroup = this.formBuilder.group({
    lastName: new FormControl(''),
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

  ngOnInit() {
    this.client = this.route.snapshot.data['client'];

    if (!!this.client) {
      this.formGroup.patchValue({
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        phoneNumber: this.client.phoneNumber,
        email: this.client.email,
        street: this.client.address?.street,
        houseNumber: this.client.address?.houseNumber,
        box: this.client.address?.box,
        zipCode: this.client.address?.zipCode,
        city: this.client.address?.city,
        country: this.client.address?.country
      });
    }
  }

  save(){
    const values = this.formGroup.value;

    let client = new Client({
      idClient: this.client?.idClient,
      type: ClientTypeEnum.PRIVATE,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      address: new Address({
        street: values.street,
        houseNumber: values.houseNumber,
        box: values.box,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country
      })
    })

    if (!!client) {
      this.clientService.updateClient(client).subscribe({
        next: value => {
          this.router.navigate(['client']);
        },
        error: err => {
          this.snackBar.open('Une erreur s\'est produite', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      })
    } else {
      this.clientService.createClient(client).subscribe({
          next: value => {
            this.router.navigate(['client']);
          },
          error: err => {
            this.snackBar.open('Une erreur s\'est produite', 'OK', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000
            });
          }
        });
    }
  }
}
