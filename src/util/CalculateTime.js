const CalculateTime = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const reminderDate = new Date(date);
  const today = new Date();
  reminderDate.setHours(reminderDate.getHours() - 5);
  reminderDate.setMinutes(reminderDate.getMinutes() - 30);

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let dateSection = "";
  let min = reminderDate.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let timeSection = reminderDate.getHours() + ":" + min;
  const isToday = today.toDateString() === reminderDate.toDateString();

  const wasYesterday = yesterday.toDateString() === reminderDate.toDateString();
  const isTomorrow = tomorrow.toDateString() === reminderDate.toDateString();

  const timeGotOver = reminderDate < today;
  if (isToday) {
    dateSection = "Today";
  } else if (wasYesterday) {
    dateSection = "Yesterday";
  } else if (isTomorrow) {
    dateSection = "Tomorrow";
  } else {
    dateSection =
      months[reminderDate.getMonth()] +
      " " +
      reminderDate.getDate() +
      " " +
      reminderDate.getFullYear();
  }

  return [dateSection, timeSection, timeGotOver];
};
export default CalculateTime;
