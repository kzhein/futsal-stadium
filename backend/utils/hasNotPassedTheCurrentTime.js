module.exports = (date, minute) => {
  const current = new Date();

  const section = new Date(date);
  const hour = minute / 60;
  section.setHours(hour, 0, 0, 0);

  return current.getTime() < section.getTime();
};
