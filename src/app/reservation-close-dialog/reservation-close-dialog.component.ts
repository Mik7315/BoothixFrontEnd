import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-reservation-close-dialog',
  standalone: true,
  templateUrl: './reservation-close-dialog.component.html',
  imports: [
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrls: ['./reservation-close-dialog.component.scss']
})
export class ReservationCloseDialogComponent {
  private matDialogRef = inject(MatDialogRef<ReservationCloseDialogComponent>);
  private formBuilder = inject(FormBuilder);

  formGroup = this.formBuilder.group({
    url: new FormControl(null, Validators.required),
  });

  constructor() {
  }

  confirm() {
    if (this.formGroup.invalid) {
      return;
    }
    const values = this.formGroup.value;
    const url = values.url;

    this.matDialogRef.close(url);
  }

  cancel() {
    this.matDialogRef.close(false);
  }
}
