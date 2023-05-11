export default {
  OPEN_CLOSE_KIOSK: {
    target: "0/60 * * * * *",
    recurrence: "1m",
    description: "Running for check if kiosk is available",
    function: () => {},
  },
};
