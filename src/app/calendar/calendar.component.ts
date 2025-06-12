import { Component, OnInit } from '@angular/core';
import { ReservationService } from "../services/reservation.service";
import { Reservation } from "../model/reservation";
import { ReservationStatusEnum } from "../model/reservation-status-enum";
import { MatIconModule } from "@angular/material/icon";
import { DatePipe, NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [
    MatIconModule,
    DatePipe,
    RouterLink,
    MatTooltipModule,
    NgStyle,
    NgClass,
    NgForOf,
    NgIf,
    MatButtonModule,
    RouterLinkActive
  ]
})
export class CalendarComponent implements OnInit {
  weeks: (Date | null)[][] = [];
  currentDate: Date = new Date();
  reservations: Reservation[] = [];

  reservationStatus = [
    { value: ReservationStatusEnum.OPTION, viewValue: 'Option' },
    { value: ReservationStatusEnum.BOOKED, viewValue: 'Réservé' },
    { value: ReservationStatusEnum.CLOSED, viewValue: 'Clôturée' },
    { value: ReservationStatusEnum.CANCELLED, viewValue: 'Annulée' }
  ];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.generateCalendar();
    this.reservationService.getAll().subscribe(x => {
      this.reservations = x;
    });
  }

  generateCalendar() {
    const start = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const end = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const startDay = start.getDay() === 0 ? 6 : start.getDay() - 1;
    const daysInMonth = end.getDate();
    const calendarDays: (Date | null)[] = [];

    // Jours vides avant le 1er
    for (let i = 0; i < startDay; i++) { calendarDays.push(null); }

    // Les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i));
    }

    // Découper en semaines
    this.weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      this.weeks.push(calendarDays.slice(i, i + 7));
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  getReservationsForDate(date: Date | null): Reservation[] {
    if (!date) return [];
    return this.reservations.filter(r =>
      r.eventDate ? this.isSameDate(new Date(r.eventDate), date) : false
    );
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  getColor(status: ReservationStatusEnum | undefined): string {
    switch (status) {
      case 'OPTION': return '#FFC107';
      case 'BOOKED': return '#2196F3';
      case 'CLOSED': return '#4CAF50';
      case 'CANCELLED': return '#F44336';
      default: return '';
    }
  }
}
