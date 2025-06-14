import { Component, inject, OnInit } from '@angular/core';
import { OptionService } from "../services/option.service";
import { Option } from "../model/option";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: 'app-option',
  standalone: true,
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  imports: [
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    RouterLink,
    MatButtonModule,
    RouterLinkActive,
    MatSnackBarModule
  ]
})
export class OptionComponent implements OnInit {
  private optionService = inject(OptionService);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'price', 'more'];
  options: Option[] = [];

  ngOnInit() {
    this.getAllOptions();
  }

  getAllOptions() {
    this.optionService.getAll().subscribe(x => {
      this.options = x;
    });
  }

  deleteOption(optionToDelete: Option) {
    if (!!optionToDelete?.idOption) {
      this.optionService.deleteById(optionToDelete.idOption!).subscribe({
        next: value => {
          this.getAllOptions();
        },
        error: err => {
          this.snackBar.open('Une erreur s\'est produite', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      })
    }
  }
}
