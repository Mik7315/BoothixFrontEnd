import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Stat } from "../model/stat";
import { StatComponent } from "./stat/stat.component";
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    StatComponent,
    CalendarComponent,
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);

  stat?: Stat;

  ngOnInit() {
    this.stat = this.route.snapshot.data['stat'];
  }

}
