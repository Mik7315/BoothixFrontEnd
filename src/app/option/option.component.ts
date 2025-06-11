import { Component, inject, OnInit } from '@angular/core';
import { OptionService } from "../services/option.service";
import { Option } from "../model/option";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  private optionService = inject(OptionService);
  displayedColumns: string[] = ['id', 'name', 'price', 'more'];
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
    console.log(optionToDelete);
    //Modifier un champ en DB en supprimer
  }
}
