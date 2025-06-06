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
  displayedColumns: string[] = ['id', 'name', 'description', 'price'];
  formulas: Formula[] = [];

  ngOnInit() {
    this.getAllFormulas();
  }

  getAllFormulas() {
    this.formulaService.getAll().subscribe(x => {
      this.formulas = x;
    });
  }
}
