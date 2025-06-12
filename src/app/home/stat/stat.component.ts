import { Component, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-stat',
  standalone: true,
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
  imports: [
    MatCardModule
  ]
})
export class StatComponent {

  @Input()
  title?: string;

  @Input()
  content?: string;

  @Input()
  extra?: string;
}
