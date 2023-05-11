export default (date: string) => {
  const dateObj = new Date(date);
  const hour = dateObj.getUTCHours();
  const minute = dateObj.getUTCMinutes();

  return `${hour <= 9 ? "0" + hour : hour} : ${
    minute <= 9 ? "0" + minute : minute
  }`;
};
