export const getCalendarDays = ({ year, month }) => {
  const firstDateOfMonth = new Date(year, month, 1);
  let firstDateOfCalendar = new Date(firstDateOfMonth);
  firstDateOfCalendar.setDate(
    firstDateOfCalendar.getDate() - firstDateOfCalendar.getDay()
  );
  return [...Array(35).keys()].map(idx => {
    let toReturn = new Date(firstDateOfCalendar);
    toReturn.setDate(toReturn.getDate() + idx);
    return getSTRDate(toReturn);
  });
};

export const getSTRDate = date =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export const getDayFromSTRDate = date => date.split("-")[2];
