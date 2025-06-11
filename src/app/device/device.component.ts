import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from "../services/device.service";
import { Device } from "../model/device";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  private deviceService= inject(DeviceService)
  displayedColumns: string[] = ['id', 'name', 'more'];
  devices: Device[] = [];

  ngOnInit() {
    this.getAllDevices();
  }

  getAllDevices() {
    this.deviceService.getAll().subscribe(x => {
      this.devices = x;
    })
  }

  deleteDevice(deviceToDelete: Device) {
    console.log(deviceToDelete);
    //Modifier un champ en DB en supprimer
  }
}
