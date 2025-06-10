import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
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
export class ClientNewComponent implements OnInit {
  private clientService = inject(ClientService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  client?: Client;

  clientTypes = [
    { value: ClientTypeEnum.PRIVATE, viewValue: 'Privé' },
    { value: ClientTypeEnum.BUSINESS, viewValue: 'Professionnel' }
  ];

  formGroup = this.formBuilder.group({
    type: new FormControl(ClientTypeEnum.PRIVATE),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    denomination: new FormControl(''),
    vatNumber: new FormControl(''),
    bceNumber: new FormControl(''),
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
        type: this.client.type,
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        denomination: this.client.denomination,
        vatNumber: this.client.vatNumber,
        bceNumber: this.client.bceNumber,
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

    this.formGroup.get('type')?.valueChanges.subscribe(type => {
      if (type === ClientTypeEnum.PRIVATE) {
        this.formGroup.patchValue({
          denomination: '',
          vatNumber: '',
          bceNumber: ''
        });
      }
    })
  }

  save(){
    const values = this.formGroup.value;

    let client = new Client({
      idClient: this.client?.idClient,
      type: values.type as ClientTypeEnum,
      firstName: values.firstName,
      lastName: values.lastName,
      denomination: values.denomination,
      vatNumber: values.vatNumber,
      bceNumber: values.bceNumber,
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

    if (this.client?.idClient) {
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
