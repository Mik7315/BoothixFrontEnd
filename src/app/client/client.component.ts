import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from "../services/client.service";
import { Client } from "../model/client";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatCommonModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-client',
  standalone: true,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [
    MatCommonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    RouterLink,
    MatButtonModule,
    RouterLinkActive
  ]
})
export class ClientComponent implements OnInit {
  private clientService = inject(ClientService);
  displayedColumns: string[] = ['name', 'phoneNumber', 'more'];
  clients: Client[] = [];

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients(){
    this.clientService.getAll().subscribe(x => {
      this.clients = x;
    })
  }

  deleteClient(clientToDelete: Client) {
    console.log(clientToDelete);
    //Modifier un champ en DB en supprimer
  }
}
