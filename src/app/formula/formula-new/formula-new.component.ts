import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormulaService } from "../../services/formula.service";
import { Formula } from "../../model/formula";
import { DeviceService } from "../../services/device.service";
import { Device } from "../../model/device";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgForOf, NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-formula-new',
  standalone: true,
  templateUrl: './formula-new.component.html',
  styleUrls: ['./formula-new.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgForOf,
    NgIf,
    MatSnackBarModule,
    MatIconModule,
    RouterLink,
  ]
})
export class FormulaNewComponent implements OnInit {
  private formulaService = inject(FormulaService);
  private formBuilder = inject(FormBuilder);
  private deviceService = inject(DeviceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formula?: Formula;
  devices: Device[] = [];

  formGroup = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<Number | null>(null, Validators.required),
    device: new FormControl<Device | undefined>(undefined, Validators.required)
  });

  ngOnInit() {
    this.formula = this.route.snapshot.data['formula'];

    this.deviceService.getAll().subscribe(x => {
      this.devices = x;
      this.initForm();
    });
  }

  initForm() {
    if (!!this.formula) {
      this.formGroup.patchValue({
        name: this.formula.name,
        description: this.formula.description,
        price: this.formula.price,
        device: this.devices.find(d => d.idDevice === this.formula?.device?.idDevice)
      })
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

    let formula = new Formula({
      idFormula: this.formula?.idFormula,
      name: values.name,
      description: values.description,
      price: values.price,
      device: values.device
    })

    if (this.formula?.idFormula) {
      this.formulaService.updateFormula(formula).subscribe({
        next: value => {
          this.router.navigate(['formula']);
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
      this.formulaService.createFormula(formula).subscribe({
        next: value => {
          this.router.navigate(['formula']);
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
