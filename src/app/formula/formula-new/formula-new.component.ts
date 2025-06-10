import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { FormulaService } from "../../services/formula.service";
import { Formula } from "../../model/formula";
import { DeviceService } from "../../services/device.service";
import { Device } from "../../model/device";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-formula-new',
  templateUrl: './formula-new.component.html',
  styleUrls: ['./formula-new.component.scss']
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
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl<Number | null>(null),
    device: new FormControl<Device | undefined>(undefined)
  });

  ngOnInit() {
    this.formula = this.route.snapshot.data['formula'];

    this.deviceService.getAll().subscribe(x => {
      this.devices = x;
      if (!!this.formula) {
        this.formGroup.patchValue({
          name: this.formula.name,
          description: this.formula.description,
          price: this.formula.price,
          device: this.devices.find(d => d.idDevice === this.formula?.device?.idDevice)
        })
      }
    });
  }

  save(){
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
}
