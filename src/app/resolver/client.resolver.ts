import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { ClientService } from "../services/client.service";
import { Client } from "../model/client";

export const clientResolver: ResolveFn<Client | null> = (route) => {
  const clientService = inject(ClientService);
  const clientId = route.params['idClient'];

  if (!!clientId) {
    return clientService.getById(clientId);
  } else {
    return null;
  }
};
