export default (date: string) => {
  console.log(`date: ${date}`);
  console.log(`date2: ${new Date(date)}`);
  let day = new Date(date).getHours();
  let minute = new Date(date).getMinutes();
  console.log(`${day} ${minute}`);

  let base = `2000-01-01T${
    (day <= 9 ? "0" + day : day) + ":" + (minute <= 9 ? "0" + minute : minute)
  }:00.000Z`;

  console.log(base);
  return base;
};
