import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = [
    { id: 1, name: 'Michael' },
    { id: 2, name: 'Gab' },
    { id: 3, name: 'Kath' },
    { id: 4, name: 'Engin' },
    { id: 5, name: 'Kris' }
  ];
}
