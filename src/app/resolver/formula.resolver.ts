import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { FormulaService } from "../services/formula.service";
import { Formula } from "../model/formula";

export const formulaResolver: ResolveFn<Formula | null> = (route) => {
  const formulaService = inject(FormulaService);
  const formulaId = route.params['idFormula'];

  if (!!formulaId) {
    return formulaService.getById(formulaId);
  } else {
    return null;
  }
};
