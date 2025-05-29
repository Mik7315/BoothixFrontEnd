import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientNewComponent } from "./client/client-new/client-new.component";
import { HomeComponent } from "./home/home.component";
import {DeviceNewComponent} from "./device/device-new/device-new.component";

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
    path: 'device/new',
    component: DeviceNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
