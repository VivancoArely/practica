export interface Cycle {}//no se
export type FlowLevel = 'bajo' | 'medio' | 'alto' | null;

export interface DayEntry {
  flow: FlowLevel;
  horas: string;
}

export interface FlowThreshold {
  copaMin: number;
  copaMax: number;
  toalla: number;
  dteoricos: number;
}

export interface DayResult {
  idx: number;
  date: Date;
  flow: FlowLevel;
  horas: string;
  scenario: 'A' | 'B';
  totalToallasDia: number;
  horasRestantes: number;
}

export interface CycleResults {
  dayResults: DayResult[];
  totalToallasUsadas: number;
  desechoTotal: number;
  plasticoEvitado: number;
  plasticoAnual: number;
}

export const THRESHOLDS: Record<string, FlowThreshold> = {
  bajo:  { copaMin: 9, copaMax: 11, toalla: 4, dteoricos: 5 },
  medio: { copaMin: 7, copaMax: 9,  toalla: 4, dteoricos: 6 },
  alto:  { copaMin: 5, copaMax: 7,  toalla: 4, dteoricos: 7 },
};

export const HOURS_OPTS: string[] = [
  '0-5 hrs', '5-7 hrs', '7-9 hrs', '9-11 hrs',
  '11-15 hrs', '15-20 hrs', '20-24 hrs',
];

export const HOURS_VAL: Record<string, number> = {
  '0-5 hrs': 2.5, '5-7 hrs': 6, '7-9 hrs': 8, '9-11 hrs': 10,
  '11-15 hrs': 13, '15-20 hrs': 17.5, '20-24 hrs': 22,
};