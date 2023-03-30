export const UpdateDateFormat = (data) => {
  let date = new Date(data);
  let month = date.getMonth();
  let day = date.getDay();
  date =
    date.getFullYear() +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);
  return date;
};
