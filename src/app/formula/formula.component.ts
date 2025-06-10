import {Component, inject, OnInit} from '@angular/core';
import {FormulaService} from "../services/formula.service";
import {Formula} from "../model/formula";

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss']
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
