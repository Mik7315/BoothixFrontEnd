import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from "../services/device.service";
import { Device } from "../model/device";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

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
    MatButtonModule,
    MatSnackBarModule
  ],
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  private deviceService= inject(DeviceService)
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'type', 'more'];
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
    if (!!deviceToDelete?.idDevice) {
      this.deviceService.deleteById(deviceToDelete.idDevice!).subscribe({
        next: value => {
          this.getAllDevices();
        },
        error: err => {
          this.snackBar.open('Une erreur s\'est produite', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      })
    }
  }
}
