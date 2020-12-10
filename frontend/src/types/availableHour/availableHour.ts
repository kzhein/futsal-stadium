export interface AvailableHour {
  _id: string;
  time: string;
  start: number;
  end: number;
  booked: boolean;
  selected?: boolean;
}

export interface AvailableHourState {
  loading: boolean;
  date: null | string;
  availableHours: AvailableHour[];
  error: null | string;
}
