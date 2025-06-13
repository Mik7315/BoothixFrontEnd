import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ClientService } from "../../services/client.service";
import { Client } from "../../model/client";
import { Address } from "../../model/address";
import { ClientTypeEnum } from "../../model/client-type-enum";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgForOf, NgIf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-client-new',
  standalone: true,
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgForOf,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    MatSnackBarModule,
    RouterLink,
  ]
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
    type: new FormControl(ClientTypeEnum.PRIVATE, Validators.required),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    denomination: new FormControl(''),
    vatNumber: new FormControl(''),
    bceNumber: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    street: new FormControl('', Validators.required),
    houseNumber: new FormControl('', Validators.required),
    box: new FormControl(''),
    zipCode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.client = this.route.snapshot.data['client'];

    this.initForm();

    this.formGroup.get('type')?.valueChanges.subscribe(type => {
      if (type === ClientTypeEnum.PRIVATE) {
        this.formGroup.patchValue({
          denomination: null,
          vatNumber: null,
          bceNumber: null,
        });
      }
    })
  }

  initForm() {
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
    } else {
      this.formGroup.reset();
    }
  }

  save(){
    if (this.formGroup.invalid) {
      this.snackBar.open('Veuillez remplir les champs obligatoire', 'OK', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });
      return;
    }

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

  reset() {
    this.initForm();
  }
}
