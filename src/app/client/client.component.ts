import {Component, inject, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {Client} from "../model/client";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  private clientService = inject(ClientService)
  displayedColumns: string[] = ['id', 'name'];
  clients: Client[] = [];

  ngOnInit() {
    this.getAllClients()
  }

  getAllClients(){
    this.clientService.getAll().subscribe(x => {
      this.clients = x;
    })
  }
}
