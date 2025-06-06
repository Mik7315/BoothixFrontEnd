import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {FormulaService} from "../../services/formula.service";
import {Formula} from "../../model/formula";
import {DeviceService} from "../../services/device.service";
import {Device} from "../../model/device";

@Component({
  selector: 'app-formula-new',
  templateUrl: './formula-new.component.html',
  styleUrls: ['./formula-new.component.scss']
})
export class FormulaNewComponent implements OnInit {
  private formulaService = inject(FormulaService);
  private formBuilder = inject(FormBuilder);
  private deviceService = inject(DeviceService);

  devices: Device[] = [];

  formGroup = this.formBuilder.group({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    device: new FormControl('')
  });

  ngOnInit() {
    this.getAllDevices();
  }

  save(){
    const name = this.formGroup.controls.name.value;
    const description = this.formGroup.controls.description.value;
    const price = this.formGroup.controls.price.value;
    const device = this.formGroup.controls.device.value;

    let formula = new Formula({
      name: name,
      description: description,
      price: price,
      device: device
    })

    this.formulaService.createFormula(formula).subscribe();
  }

  getAllDevices() {
    this.deviceService.getAll().subscribe(x => {
      this.devices = x;
    });
  }
}
