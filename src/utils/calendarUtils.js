export const getCalendarDays = ({ year, month }) => {
  const firstDateOfMonth = new Date(year, month - 1, 1);
  let firstDateOfCalendar = new Date(firstDateOfMonth);
  firstDateOfCalendar.setDate(
    firstDateOfCalendar.getDate() - firstDateOfCalendar.getDay()
  );
  return [...Array(35).keys()].map(idx => {
    let toReturn = new Date(firstDateOfCalendar);
    toReturn.setDate(toReturn.getDate() + idx);
    return formattedDate(toReturn);
  });
};

export const formattedDate = date =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;

export const formattedDateTime = date =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}T${date.getHours()}:${date.getMinutes()}`;

export const parseFormattedDateTime = formattedDateTime =>
  new Date(formattedDateTime);

export const getDayFromDate = date => date.split(/[-T]/)[2];

export const getDateFromDateTime = date => date.split(/[T]/)[0];

export const getTimeFromDateTime = date => date.split(/[T]/)[1];
