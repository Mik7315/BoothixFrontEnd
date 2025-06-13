import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from "../services/device.service";
import { Device } from "../model/device";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-device',
  standalone: true,
  templateUrl: './device.component.html',
  imports: [
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule
  ],
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  private deviceService= inject(DeviceService)
  displayedColumns: string[] = ['id', 'name', 'type', 'more'];
  devices: Device[] = [];

  ngOnInit() {
    this.getAllDevices();
  }

  getAllDevices() {
    this.deviceService.getAll().subscribe(devices => {
      this.devices = devices;
    })
  }

  deleteDevice(deviceToDelete: Device) {
    console.log(deviceToDelete);
    //Modifier un champ en DB en supprimer
  }
}
