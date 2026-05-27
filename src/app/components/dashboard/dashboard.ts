import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CycleResults, DayResult, THRESHOLDS } from '../../models/cycle';

interface PlannerCard {
  dayName : string;
  dateStr : string;
  scenario: 'A' | 'B' | null;
  result  : DayResult | null;
}

interface BarGroup {
  label    : string;
  teorico  : number;
  real     : number;
  teoricoH : number;
  realH    : number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnChanges {
  @Input() results      !: CycleResults;
  @Input() diaSelected  !: Date;
  @Input() duracionCiclo!: number;

  @Output() limpiar = new EventEmitter<void>();

  readonly DAY_NAMES_SHORT = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  readonly BAR_H = 120;

  plannerCards: PlannerCard[] = [];
  barGroups   : BarGroup[]    = [];
  maxVal      : number        = 1;

  ngOnChanges(): void {
    this.buildPlanner();
    this.buildBars();
  }

  buildPlanner(): void {
    this.plannerCards = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(this.diaSelected);
      d.setDate(d.getDate() + i);
      const dr = this.results.dayResults[i] ?? null;
      return {
        dayName : this.DAY_NAMES_SHORT[d.getDay()],
        dateStr : `${d.getDate()}/${d.getMonth() + 1}`,
        scenario: dr ? dr.scenario : null,
        result  : dr,
      };
    });
  }

  buildBars(): void {
    this.maxVal = Math.max(
      ...this.results.dayResults.map(d =>
        Math.max(d.totalToallasDia, THRESHOLDS[d.flow!].dteoricos)
      ), 1
    );
    this.barGroups = this.results.dayResults.map((d, i) => {
      const teo = THRESHOLDS[d.flow!].dteoricos;
      const real = d.totalToallasDia;
      return {
        label   : `D${i + 1}`,
        teorico : teo,
        real    : real,
        teoricoH: (teo  / this.maxVal) * this.BAR_H,
        realH   : Math.max((real / this.maxVal) * this.BAR_H, real > 0 ? 4 : 0),
      };
    });
  }

  get halfVal(): number { return Math.ceil(this.maxVal / 2); }

  ringDash(pct: number, r: number): number {
    return Math.min(pct, 1) * 2 * Math.PI * r;
  }
  ringCirc(r: number): number { return 2 * Math.PI * r; }

  get p1Pct(): number { return this.results.plasticoEvitado / 0.5; }
  get p2Pct(): number { return this.results.plasticoAnual   / 6.5; }

  get saved(): number {
    return this.results.desechoTotal - this.results.totalToallasUsadas;
  }
}