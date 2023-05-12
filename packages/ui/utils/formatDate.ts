export default (date: string) => {
  let day = new Date(date).getHours();
  let minute = new Date(date).getMinutes();

  let base = `2000-01-01T${
    (day <= 9 ? "0" + day : day) + ":" + (minute <= 9 ? "0" + minute : minute)
  }:00.000Z`;

  return base;
};
