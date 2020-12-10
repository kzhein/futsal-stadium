const formatDate = date => {
  const dateObject = new Date(date);
  return `${dateObject.getFullYear()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getDate()}`;
};

export default formatDate;
