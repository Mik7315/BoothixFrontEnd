import { Component, inject, OnInit } from '@angular/core';
import { FormulaService } from "../services/formula.service";
import { Formula } from "../model/formula";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

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
    MatButtonModule
  ]
})
export class FormulaComponent implements OnInit{
  private formulaService = inject(FormulaService);
  displayedColumns: string[] = ['id', 'name', 'price','more'];
  formulas: Formula[] = [];

  ngOnInit() {
    this.getAllFormulas();
  }

  getAllFormulas() {
    this.formulaService.getAll().subscribe(x => {
      this.formulas = x;
    });
  }

  deleteFormula(formulaToDelete: Formula) {
    console.log(formulaToDelete);
    //Modifier un champ en DB en supprimer
  }
}
