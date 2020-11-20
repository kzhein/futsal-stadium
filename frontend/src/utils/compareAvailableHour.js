const compareAvailableHour = (date, minute) => {
  const current = new Date();
  // 9:23 PM

  const section = new Date(date);
  const hour = minute / 60;
  section.setHours(hour, 0, 0, 0);
  // 10:00 PM

  return current.getTime() < section.getTime();
};

export default compareAvailableHour;
