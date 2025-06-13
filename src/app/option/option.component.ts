import { Component, inject, OnInit } from '@angular/core';
import { OptionService } from "../services/option.service";
import { Option } from "../model/option";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

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
    RouterLinkActive
  ]
})
export class OptionComponent implements OnInit {
  private optionService = inject(OptionService);
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
    console.log(optionToDelete);
    //Modifier un champ en DB en supprimer
  }
}
