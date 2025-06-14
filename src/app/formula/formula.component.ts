import { Component, inject, OnInit } from '@angular/core';
import { FormulaService } from "../services/formula.service";
import { Formula } from "../model/formula";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: 'app-formula',
  standalone: true,
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss'],
  imports: [
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class FormulaComponent implements OnInit{
  private formulaService = inject(FormulaService);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'price', 'device','more'];
  formulas: Formula[] = [];

  ngOnInit() {
    this.getAllFormulas();
  }

  getAllFormulas() {
    this.formulaService.getAll().subscribe(formulas => {
      this.formulas = formulas;
    });
  }

  deleteFormula(formulaToDelete: Formula) {
    if (!!formulaToDelete?.idFormula) {
      this.formulaService.deleteById(formulaToDelete.idFormula!).subscribe({
        next: value => {
          this.getAllFormulas();
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
