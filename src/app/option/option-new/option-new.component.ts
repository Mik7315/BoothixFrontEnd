import {Component, inject, OnInit} from '@angular/core';
import {OptionService} from "../../services/option.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Option} from "../../model/option";
import {OptionComponent} from "../option.component";

@Component({
  selector: 'app-option-new',
  templateUrl: './option-new.component.html',
  styleUrls: ['./option-new.component.scss']
})
export class OptionNewComponent implements OnInit{
  private optionService = inject(OptionService);
  private formBuilder = inject(FormBuilder);

  options: Option[] = [];

  formGroup = this.formBuilder.group({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('')
  });

  ngOnInit() {
    this.getAllOptions();
  }

  save(){
    const name = this.formGroup.controls.name.value;
    const description = this.formGroup.controls.description.value;
    const price = this.formGroup.controls.price.value;

    let option = new Option({
      name: name,
      description: description,
      price: price
    })

    this.optionService.createOption(option).subscribe();
  }

  getAllOptions(){
    this.optionService.getAll().subscribe(x => {
      this.options = x;
    });
  }
}
