import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-reservation-cancel-dialog',
  standalone: true,
  templateUrl: './reservation-cancel-dialog.component.html',
  imports: [
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrls: ['./reservation-cancel-dialog.component.scss']
})
export class ReservationCancelDialogComponent {
  private matDialogRef = inject(MatDialogRef<ReservationCancelDialogComponent>);

  confirm() {
    this.matDialogRef.close(true);
  }

  cancel() {
    this.matDialogRef.close(false);
  }
}
