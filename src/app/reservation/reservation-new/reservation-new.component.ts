import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from "../../services/reservation.service";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ClientService } from "../../services/client.service";
import { OptionService } from "../../services/option.service";
import { FormulaService } from "../../services/formula.service";
import { Reservation } from "../../model/reservation";
import { Client } from "../../model/client";
import { Option } from "../../model/option";
import { Formula } from "../../model/formula";
import { ReservationStatusEnum } from "../../model/reservation-status-enum";
import { Address } from "../../model/address";
import * as moment from 'moment';
import { forkJoin } from "rxjs";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-reservation-new',
  standalone: true,
  templateUrl: './reservation-new.component.html',
  styleUrls: ['./reservation-new.component.scss'],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink,
  ]
})
export class ReservationNewComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private formBuilder = inject(FormBuilder);
  private clientService = inject(ClientService);
  private optionService = inject(OptionService);
  private formulaService = inject(FormulaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  reservation?: Reservation;
  clients: Client[] = [];
  options: Option[] = [];
  formulas: Formula[] = [];

  reservationStatus = [
    { value: ReservationStatusEnum.OPTION, viewValue: 'Option' },
    { value: ReservationStatusEnum.BOOKED, viewValue: 'Réservé' },
    { value: ReservationStatusEnum.CLOSED, viewValue: 'Clôturée' },
    { value: ReservationStatusEnum.CANCELLED, viewValue: 'Annulée' }
  ];

  formGroup = this.formBuilder.group({
    phoneNumber: new FormControl(''),
    street: new FormControl(''),
    houseNumber: new FormControl(''),
    box: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    status: new FormControl(ReservationStatusEnum.OPTION),
    selectedDateEvent: new FormControl(''),

    // Dates et heures : stockées séparément, puis combinées
    eventDate: new FormControl('', Validators.required),
    eventTime: new FormControl('', Validators.required),
    installationDate: new FormControl(''),
    installationTime: new FormControl(''),
    pickUpDate: new FormControl(''),
    pickUpTime: new FormControl(''),

    deliveryCost: new FormControl<number | null>(null),
    discount: new FormControl<number | null>(null),
    totalPrice: new FormControl<number | null>(null),
    deposit: new FormControl<number | null>(null),
    comment: new FormControl(''),
    galleryLink: new FormControl(''),

    client: new FormControl<Client | undefined>(undefined, Validators.required),
    options: new FormControl<Option[] | undefined>(undefined),
    formulas: new FormControl<Formula[] | undefined>(undefined)
  })

  ngOnInit() {
    this.reservation = this.route.snapshot.data['reservation'];

    const formulasObs = this.formulaService.getAll();
    const optionsObs = this.optionService.getAll();
    const clientsObs = this.clientService.getAll();

    forkJoin([formulasObs, optionsObs, clientsObs]).subscribe(data => {
      this.formulas = data[0];
      this.options = data[1];
      this.clients = data[2];

      this.initForm();
    });
  }

  initForm() {
    if (!!this.reservation) {
      this.formGroup.patchValue({
        phoneNumber: this.reservation.phoneNumber,
        street: this.reservation.address?.street,
        houseNumber: this.reservation.address?.houseNumber,
        box: this.reservation.address?.box,
        zipCode: this.reservation.address?.zipCode,
        city: this.reservation.address?.city,
        country: this.reservation.address?.country,
        status: this.reservation.status,
        eventDate: this.reservation.eventDate,
        eventTime: this.reservation.eventTime,
        installationDate: this.reservation.installationDate,
        installationTime: this.reservation.installationTime,
        pickUpDate: this.reservation.pickUpDate,
        pickUpTime: this.reservation.pickUpTime,
        deliveryCost: this.reservation.deliveryCost,
        discount: this.reservation.discount,
        totalPrice: this.reservation.totalPrice,
        deposit: this.reservation.deposit,
        comment: this.reservation.comment,
        galleryLink: this.reservation.galleryLink,
        client: this.clients.find(client => client.idClient === this.reservation?.client?.idClient),
        options: this.options.filter(option => !!this.reservation?.options?.find(o => o.idOption === option.idOption)),
        formulas: this.formulas.filter(formula => !!this.reservation?.formulas?.find(f => f.idFormula === formula.idFormula))
      });
    } else {
      this.formGroup.reset();
    }
  }

  save() {
    if (this.formGroup.invalid) {
      this.snackBar.open('Veuillez remplir les champs obligatoire', 'OK', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });
      return;
    }
    const values = this.formGroup.value;

    let reservation = new Reservation({
      idReservation: this.reservation?.idReservation,
      phoneNumber: values.phoneNumber,
      address: new Address({
        street: values.street,
        houseNumber: values.houseNumber,
        box: values.box,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country
      }),
      status: values.status,
      selectedDateEvent: values.selectedDateEvent,
      eventDate: !!values.eventDate ? moment(values.eventDate).format('YYYY-MM-DD') : null,
      eventTime: values.eventTime,
      installationDate: !!values.installationDate ? moment(values.installationDate).format('YYYY-MM-DD') : null,
      installationTime: values.installationTime,
      pickUpDate: !!values.pickUpDate ? moment(values.pickUpDate).format('YYYY-MM-DD') : null,
      pickUpTime: values.pickUpTime,
      deliveryCost: values.deliveryCost,
      discount: values.discount,
      totalPrice: values.totalPrice,
      deposit: values.deposit,
      comment: values.comment,
      galleryLink: values.galleryLink,
      client: values.client,
      options: values.options,
      formulas: values.formulas,
    })

    if (this.reservation?.idReservation) {
      this.reservationService.updateReservation(reservation).subscribe({
        next: value => {
          this.router.navigate(['reservation']);
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
      this.reservationService.createReservation(reservation).subscribe({
        next: value => {
          this.router.navigate(['reservation']);
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
