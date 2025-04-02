import {Component, inject} from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Device} from "../../model/device";
import {DeviceTypeEnum} from "../../model/device-type-enum";

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.scss']
})
export class DeviceNewComponent {
  private deviceService = inject(DeviceService)
  private formBuilder = inject(FormBuilder);

  formGroup = this.formBuilder.group({
    name: new FormControl(''),
    description: new FormControl('')
  });

  save(){
    const name = this.formGroup.controls.name.value;
    const description = this.formGroup.controls.description.value;

    let device = new Device({
      name: name,
      description: description,
      type: DeviceTypeEnum.PHOTOBOOTH
    })

    this.deviceService.createDevice(device).subscribe();
  }
}
