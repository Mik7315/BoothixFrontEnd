import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Stat } from "../model/stat";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);

  stat?: Stat;

  ngOnInit() {
    this.stat = this.route.snapshot.data['stat'];
  }

}
