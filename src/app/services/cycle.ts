


import { Injectable } from '@angular/core';
import {
  CycleResults, DayEntry, DayResult,
  HOURS_VAL, THRESHOLDS,
} from '../models/cycle';

@Injectable({ providedIn: 'root' })
export class CycleService {

  computeResults(
    diaSelected: Date,
    duracionCiclo: number,
    days: DayEntry[],
  ): CycleResults {
    const activeDays = days.slice(0, duracionCiclo);
    let totalToallasUsadas = 0;
    let desechoTotal = 0;

    const dayResults: DayResult[] = activeDays.map((d, i) => {
      const th = THRESHOLDS[d.flow!];
      const hVal = HOURS_VAL[d.horas] ?? 0;
      desechoTotal += th.dteoricos;

      const date = new Date(diaSelected);
      date.setDate(date.getDate() + i);

      if (hVal <= th.copaMin) {
        return {
          idx: i, date, flow: d.flow, horas: d.horas,
          scenario: 'A', totalToallasDia: 0,
          horasRestantes: 24 - hVal,
        };
      } else {
        const tTD = Math.ceil(hVal / th.toalla);
        totalToallasUsadas += tTD;
        return {
          idx: i, date, flow: d.flow, horas: d.horas,
          scenario: 'B', totalToallasDia: tTD,
          horasRestantes: 24 - hVal,
        };
      }
    });

    const plasticoEvitado = (desechoTotal - totalToallasUsadas) * 0.010;
    const plasticoAnual   = plasticoEvitado * 13;

    return { dayResults, totalToallasUsadas, desechoTotal, plasticoEvitado, plasticoAnual };
  }

  getCycleDates(diaSelected: Date, duracionCiclo: number): Date[] {
    return Array.from({ length: duracionCiclo }, (_, i) => {
      const d = new Date(diaSelected);
      d.setDate(d.getDate() + i);
      return d;
    });
  }

  isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth()    === b.getMonth()    &&
           a.getDate()     === b.getDate();
  }
}