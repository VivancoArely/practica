import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayEntry, FlowLevel, HOURS_OPTS } from '../../models/cycle';

@Component({
  selector: 'app-flow-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flow-grid.html',
  styleUrls: ['./flow-grid.css'],
})
export class FlowGridComponent {
  @Input()  duracionCiclo = 1;
  @Input()  days: DayEntry[] = [];
  @Output() dayUpdated = new EventEmitter<{ idx: number; entry: DayEntry }>();

  readonly rows        = [0, 1, 2, 3, 4, 5, 6];
  readonly HOURS_OPTS  = HOURS_OPTS;

  isEnabled(i: number): boolean { return i < this.duracionCiclo; }

  selectFlow(idx: number, flow: FlowLevel): void {
    if (!this.isEnabled(idx)) return;
    const current = this.days[idx].flow;
    this.dayUpdated.emit({
      idx,
      entry: { ...this.days[idx], flow: current === flow ? null : flow },
    });
  }

  selectHoras(idx: number, value: string): void {
    if (!this.isEnabled(idx)) return;
    this.dayUpdated.emit({ idx, entry: { ...this.days[idx], horas: value } });
  }
}