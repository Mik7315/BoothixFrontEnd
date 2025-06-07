import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientNewComponent } from "./client/client-new/client-new.component";
import { HomeComponent } from "./home/home.component";
import { DeviceNewComponent } from "./device/device-new/device-new.component";
import { DeviceComponent } from "./device/device.component";
import { FormulaComponent } from "./formula/formula.component";
import { FormulaNewComponent } from "./formula/formula-new/formula-new.component";
import { OptionComponent } from "./option/option.component";
import { OptionNewComponent } from "./option/option-new/option-new.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'client/new',
    component: ClientNewComponent
  },
  {
    path: 'device',
    component: DeviceComponent
  },
  {
    path: 'device/new',
    component: DeviceNewComponent
  },
  {
    path: 'formula',
    component: FormulaComponent
  },
  {
    path: 'formula/new',
    component: FormulaNewComponent
  },
  {
    path: 'option',
    component: OptionComponent
  },
  {
    path: 'option/new',
    component: OptionNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
