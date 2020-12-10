import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
  getAvailableHours,
  setDate as setAvaDate,
} from '../actions/availableHourActions';
import formatDate from '../utils/formatDate';

const DatePicker: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    const formattedDate = formatDate(date);
    dispatch(setAvaDate(formattedDate));
    dispatch(getAvailableHours(formattedDate));
  }, [date, dispatch]);

  return (
    <div>
      <Calendar
        onChange={date => setDate(date as Date)}
        value={date}
        minDate={new Date()}
      />
    </div>
  );
};

export default DatePicker;
