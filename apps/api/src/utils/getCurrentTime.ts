import getBaseTime from "./getBaseTime";

export default () => {
  const time = new Date(new Date().setUTCHours(new Date().getHours()))
    .toISOString()
    .substring(11, 24);
  const dateTime = `${getBaseTime() + time}`;
  return dateTime;
};
