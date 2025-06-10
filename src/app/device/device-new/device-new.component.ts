import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from "../../services/device.service";
import { FormBuilder, FormControl } from "@angular/forms";
import { Device } from "../../model/device";
import { DeviceTypeEnum } from "../../model/device-type-enum";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
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
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(DeviceTypeEnum.PHOTOBOOTH)
  });

  ngOnInit() {
    this.device = this.route.snapshot.data['device'];

    if (!!this.device) {
      this.formGroup.patchValue({
        name: this.device.name,
        description: this.device.description,
        type: this.device.type
      });
    }
  }

  save(){
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
}
