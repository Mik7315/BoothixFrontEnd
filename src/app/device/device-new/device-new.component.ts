import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from "../../services/device.service";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Device } from "../../model/device";
import { DeviceTypeEnum } from "../../model/device-type-enum";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgForOf, NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-device-new',
  standalone: true,
  templateUrl: './device-new.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    NgForOf,
    MatSnackBarModule,
    RouterLink,
    MatIconModule,
    NgIf
  ],
  styleUrls: ['./device-new.component.scss']
})
export class DeviceNewComponent implements OnInit {
  private deviceService = inject(DeviceService)
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  device?: Device;

  deviceTypes = [
    { value: DeviceTypeEnum.PHOTOBOOTH, viewValue: 'Photo' },
    { value: DeviceTypeEnum.PHOTOBOOTH_MINI, viewValue: 'Photo (petit)' },
    { value: DeviceTypeEnum.MIRRORBOOTH, viewValue: 'Miroir' },
    { value: DeviceTypeEnum.MIRRORBOOTH_MINI, viewValue: 'Miroir (petit)' },
    { value: DeviceTypeEnum.VIDEOBOOTH, viewValue: 'Video' },
    { value: DeviceTypeEnum.AUDIOBOOTH, viewValue: 'Audio' },
  ]

  formGroup = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl(DeviceTypeEnum.PHOTOBOOTH, Validators.required)
  });

  ngOnInit() {
    this.device = this.route.snapshot.data['device'];

    this.initForm();
  }

  initForm() {
    if (!!this.device) {
      this.formGroup.patchValue({
        name: this.device.name,
        description: this.device.description,
        type: this.device.type
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

    let device = new Device({
      idDevice: this.device?.idDevice,
      name: values.name,
      description: values.description,
      type: values.type as DeviceTypeEnum
    })

    if (this.device?.idDevice) {
      this.deviceService.updateDevice(device).subscribe({
        next: value => {
          this.router.navigate(['device']);
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
      this.deviceService.createDevice(device).subscribe({
        next: value => {
          this.router.navigate(['device']);
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
