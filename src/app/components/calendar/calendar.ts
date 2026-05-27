import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CycleService } from '../../services/cycle';

interface CalDay {
  date     : Date | null;
  label    : number | null;
  isPast   : boolean;
  isToday  : boolean;
  isInCycle: boolean;
  isStart  : boolean;
  isEnd    : boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css'],
})
export class CalendarComponent implements OnChanges {
  @Input() diaSelected  : Date | null = null;
  @Input() duracionCiclo: number = 1;
  @Output() dateSelected = new EventEmitter<Date>();

  readonly MONTH_NAMES = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
  ];
  readonly DAY_NAMES = ['Do','Lu','Ma','Mi','Ju','Vi','Sá'];

  today     = new Date();
  viewYear  : number;
  viewMonth : number;
  calDays   : CalDay[] = [];
  cycleDates: Date[]   = [];

  constructor(private cycleSvc: CycleService) {
    this.today.setHours(0, 0, 0, 0);
    this.viewYear  = this.today.getFullYear();
    this.viewMonth = this.today.getMonth();
    this.buildCalendar();
  }

  ngOnChanges(): void {
    this.cycleDates = this.diaSelected
      ? this.cycleSvc.getCycleDates(this.diaSelected, this.duracionCiclo)
      : [];
    this.buildCalendar();
  }

  buildCalendar(): void {
    const firstDay     = new Date(this.viewYear, this.viewMonth, 1).getDay();
    const daysInMonth  = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const cycleStart   = this.cycleDates[0] ?? null;
    const cycleEnd     = this.cycleDates[this.cycleDates.length - 1] ?? null;
    const days: CalDay[] = [];

    for (let i = 0; i < firstDay; i++)
      days.push({ date: null, label: null, isPast: false, isToday: false, isInCycle: false, isStart: false, isEnd: false });

    for (let d = 1; d <= daysInMonth; d++) {
      const date     = new Date(this.viewYear, this.viewMonth, d);
      const isPast   = date < this.today;
      const isToday  = this.cycleSvc.isSameDay(date, this.today);
      const isInCycle= this.cycleDates.some(cd => this.cycleSvc.isSameDay(cd, date));
      const isStart  = !!cycleStart && this.cycleSvc.isSameDay(date, cycleStart);
      const isEnd    = !!cycleEnd   && this.cycleSvc.isSameDay(date, cycleEnd);
      days.push({ date, label: d, isPast, isToday, isInCycle, isStart, isEnd });
    }
    this.calDays = days;
  }

  prevMonth(): void {
    this.viewMonth--;
    if (this.viewMonth < 0) { this.viewMonth = 11; this.viewYear--; }
    this.buildCalendar();
  }

  nextMonth(): void {
    this.viewMonth++;
    if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++; }
    this.buildCalendar();
  }

  selectDay(day: CalDay): void {
    if (!day.date || day.isPast) return;
    this.dateSelected.emit(new Date(day.date));
  }

  get cycleEndDate(): Date | null {
    return this.cycleDates[this.cycleDates.length - 1] ?? null;
  }

  get formattedSelected(): string {
    if (!this.diaSelected) return '';
    const base = this.diaSelected.toLocaleDateString('es-MX', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    if (this.cycleEndDate && !this.cycleSvc.isSameDay(this.diaSelected, this.cycleEndDate)) {
      const end = this.cycleEndDate.toLocaleDateString('es-MX', { day:'numeric', month:'short' });
      return `${base} → ${end}`;
    }
    return base;
  }
}