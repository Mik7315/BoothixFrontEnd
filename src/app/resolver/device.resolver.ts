import { ResolveFn } from '@angular/router';
import { Device } from "../model/device";
import { inject } from "@angular/core";
import { DeviceService } from "../services/device.service";

export const deviceResolver: ResolveFn<Device | null> = (route) => {
  const deviceService = inject(DeviceService);
  const deviceId = route.params['idDevice'];

  if(!!deviceId) {
    return deviceService.getById(deviceId);
  } else {
    return null;
  }
};
