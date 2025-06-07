import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { ClientNewComponent } from './client/client-new/client-new.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DeviceComponent } from './device/device.component';
import { DeviceNewComponent } from './device/device-new/device-new.component';
import { FormulaComponent } from './formula/formula.component';
import { FormulaNewComponent } from './formula/formula-new/formula-new.component';
import { MatSelectModule } from "@angular/material/select";
import { OptionComponent } from "./option/option.component";
import { OptionNewComponent } from "./option/option-new/option-new.component";

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientNewComponent,
    HomeComponent,
    MenuComponent,
    DeviceComponent,
    DeviceNewComponent,
    FormulaComponent,
    FormulaNewComponent,
    OptionComponent,
    OptionNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
