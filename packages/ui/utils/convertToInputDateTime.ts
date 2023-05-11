export default (date: string, invert?: true) => {
  const a = new Date(
    new Date(date as string).setHours(
      new Date(date as string).getHours() + (invert ? -2 : +2)
    )
  );

  console.log("date", date);
  console.log("a", a);
  return a;
};
