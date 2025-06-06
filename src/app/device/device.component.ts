import { Component } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource = [
    { id: 1, name: 'photo', description: 'petit' },
    { id: 2, name: 'miroir', description: 'moyen' },
    { id: 3, name: 'photo2', description: 'grand' },
    { id: 4, name: '360', description: 'grand' },
    { id: 5, name: 'audio', description: 'petit' }
  ];
}
