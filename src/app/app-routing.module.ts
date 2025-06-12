import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientNewComponent } from "./client/client-new/client-new.component";
import { HomeComponent } from "./home/home.component";
import { DeviceNewComponent } from "./device/device-new/device-new.component";
import { DeviceComponent } from "./device/device.component";
import { FormulaComponent } from "./formula/formula.component";
import { FormulaNewComponent } from "./formula/formula-new/formula-new.component";
import { OptionComponent } from "./option/option.component";
import { OptionNewComponent } from "./option/option-new/option-new.component";
import { clientResolver } from "./resolver/client.resolver";
import { deviceResolver } from "./resolver/device.resolver";
import { formulaResolver } from "./resolver/formula.resolver";
import { optionResolver } from "./resolver/option.resolver";
import { ReservationComponent } from "./reservation/reservation.component";
import { ReservationNewComponent } from "./reservation/reservation-new/reservation-new.component";
import { reservationResolver } from "./resolver/reservation.resolver";
import { statResolver } from "./resolver/stat.resolver";
import { AuthGuard } from "./guards/auth-guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      stat: statResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client/new',
    component: ClientNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client/:idClient',
    component: ClientNewComponent,
    canActivate: [AuthGuard],
    resolve: {
      client: clientResolver
    }
  },
  {
    path: 'device',
    component: DeviceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'device/new',
    component: DeviceNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'device/:idDevice',
    component: DeviceNewComponent,
    resolve: {
      device: deviceResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'formula',
    component: FormulaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'formula/new',
    component: FormulaNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'formula/:idFormula',
    component: FormulaNewComponent,
    resolve: {
      formula: formulaResolver,
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'option',
    component: OptionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'option/new',
    component: OptionNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'option/:idOption',
    component: OptionNewComponent,
    resolve: {
      option: optionResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservation/new',
    component: ReservationNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservation/:idReservation',
    component: ReservationNewComponent,
    resolve: {
      reservation: reservationResolver
    },
    canActivate: [AuthGuard]
  }
];

export class AppRoutingModule { }
