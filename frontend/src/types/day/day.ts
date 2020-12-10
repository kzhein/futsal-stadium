export interface Day {
  _id: string;
  day: string;
  openHours: {
    _id: string;
    time: string;
    start: number;
    end: number;
  }[];
}

export interface DayState {
  days: Day[];
  day: null | Day;
  loading: boolean;
  error: null | string;
  success: null | string;
}
