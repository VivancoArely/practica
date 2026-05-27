import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent }  from '../calendar/calendar';
import { FlowGridComponent }  from '../flow-grid/flow-grid';
import { Footer }             from '../footer/footer';

import { DashboardComponent } from '../dashboard/dashboard';
import { CycleService }       from '../../services/cycle';
import { DayEntry, CycleResults, HOURS_OPTS } from '../../models/cycle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CalendarComponent, FlowGridComponent, DashboardComponent, Footer],
 templateUrl: './calculadora.html',
  styleUrls: ['./calculadora.css']
})
export class CalculadoraComponent {
  today         = new Date();
  diaSelected   : Date | null = null;
  duracionCiclo  = 1;
  readonly durations = [1, 2, 3, 4, 5, 6, 7];

  days: DayEntry[] = Array.from({ length: 7 }, () => ({ flow: null, horas: '' }));

  showDashboard = false;
  results      : CycleResults | null = null;

  constructor(private cycleSvc: CycleService) {}

  get allFilled(): boolean {
    if (!this.diaSelected) return false;
    return this.days
      .slice(0, this.duracionCiclo)
      .every(d => d.flow && d.horas);
  }

  onDateSelected(date: Date): void {
    this.diaSelected  = date;
    this.showDashboard = false;
  }

  onDuracionChange(val: string): void {
    this.duracionCiclo = +val;
    for (let i = this.duracionCiclo; i < 7; i++) {
      this.days[i] = { flow: null, horas: '' };
    }
    this.showDashboard = false;
  }

  onDayUpdated(payload: { idx: number; entry: DayEntry }): void {
    this.days[payload.idx] = { ...payload.entry };
    this.showDashboard = false;
  }

  onSubmit(): void {
    if (!this.diaSelected || !this.allFilled) return;
    this.results       = this.cycleSvc.computeResults(this.diaSelected, this.duracionCiclo, this.days);
    this.showDashboard = true;
    setTimeout(() => {
      document.querySelector('.dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}