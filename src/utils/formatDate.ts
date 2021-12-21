import moment from "moment";

export const formatDate = (date: string) => {
  const currentTime = moment();
  const timeStore = moment(date);
  const timeDiff = currentTime.diff(timeStore, "h");
  return timeDiff >= 24 ? timeStore.format("MM/DD/yyyy") : timeStore.fromNow();
};
