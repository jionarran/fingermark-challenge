export default (date: string, invert?: true) => {
  const a = new Date(
    new Date(date as string).setHours(
      new Date(date as string).getHours() + (invert ? 0 : +2)
    )
  );
  return a;
};
