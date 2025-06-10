import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Formula } from "../model/formula";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  private formulaPath: string;

  constructor(private http: HttpClient) {
    this.formulaPath = 'http://localhost:8080/api/formula';
  }

  createFormula(formula: Formula): Observable<any> {
    return this.http.post(this.formulaPath, formula);
  }

  updateFormula(formula: Formula): Observable<any> {
    return this.http.put(this.formulaPath, formula);
  }

  getAll(): Observable<Formula[]> {
    return this.http.get<Array<Formula>>(this.formulaPath);
  }

  getById(id: Number) : Observable<Formula> {
    return this.http.get(`${this.formulaPath}/${id}`);
  }
}
