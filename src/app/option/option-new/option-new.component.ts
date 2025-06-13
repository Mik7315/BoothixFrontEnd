import { Component, inject, OnInit } from '@angular/core';
import { OptionService } from "../../services/option.service";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Option } from "../../model/option";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-option-new',
  standalone: true,
  templateUrl: './option-new.component.html',
  styleUrls: ['./option-new.component.scss'],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    NgIf,
    MatIconModule,
    RouterLink,
  ]
})
export class OptionNewComponent implements OnInit{
  private optionService = inject(OptionService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  option?: Option;

  formGroup = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<Number | null>(null, Validators.required)
  });

  ngOnInit() {
    this.option = this.route.snapshot.data['option'];

    this.initForm();
  }

  initForm(){
    if (!!this.option) {
      this.formGroup.patchValue({
        name: this.option.name,
        description: this.option.description,
        price: this.option.price
      });
    } else {
      this.formGroup.reset();
    }
  }

  save(){
    if (this.formGroup.invalid) {
      this.snackBar.open('Veuillez remplir les champs obligatoire', 'OK', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });
      return;
    }

    const values = this.formGroup.value;

    let option = new Option({
      idOption: this.option?.idOption,
      name: values.name,
      description: values.description,
      price: values.price
    })

    if (this.option?.idOption) {
      this.optionService.updateOption(option).subscribe({
        next: value => {
          this.router.navigate(['option']);
        },
        error: err => {
          this.snackBar.open('Une erreur s\'est produite', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      })
    } else {
      this.optionService.createOption(option).subscribe({
        next: value => {
          this.router.navigate(['option']);
        },
        error: err => {
          this.snackBar.open('Une erreur s\'est produite', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      });
    }
  }

  reset() {
    this.initForm();
  }
}
