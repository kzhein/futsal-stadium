const formatDate = (date: Date | string): string => {
  const dateObject = new Date(date);
  return `${dateObject.getFullYear()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getDate()}`;
};

export default formatDate;
