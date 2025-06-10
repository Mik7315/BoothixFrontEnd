import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Device } from "../model/device";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private devicePath: string;

  constructor(private http: HttpClient) {
    this.devicePath = 'http://localhost:8080/api/device';
  }

  createDevice(device: Device) : Observable<any> {
    return this.http.post(this.devicePath, device);
  }

  updateDevice(device: Device) : Observable<any> {
    return  this.http.put(this.devicePath, device);
  }

  getAll(): Observable<Device[]> {
    return this.http.get<Array<Device>>(this.devicePath);
  }

  getById(id: Number) : Observable<Device> {
    return this.http.get(`${this.devicePath}/${id}`);
  }
}
