import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import {ClientNewComponent} from "./client/client-new/client-new.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'client/new',
    component: ClientNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
