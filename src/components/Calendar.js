import React, { useState, useEffect } from "react";
import { getCalendarDays, getDayFromSTRDate } from "../utils/calendarUtils";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";

const NOW = new Date();

const useStyles = makeStyles({
  calendarContainer: {
    minHeight: "400px",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "14% 14% 14% 14% 14% 14% 14%",
    gridTemplateRows: "8% 18% 18% 18% 18% 18%",
    alignItems: "stretch",
    justifyContent: "stretch"
  },
  item: {
    border: "1px solid",
    display: "flex"
  },
  itemDaysLabel: {
    backgroundColor: "lightBlue",
    justifyContent: "center",
    alignItems: "center"
  },
  itemBox: {
    flexDirection: "column",
    overflow: "auto"
  }
});

const useBoxStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  reminderList: {
    overflow: "auto"
  },
  actions: {
    fontWeight: "bold",
    margin: "2px",
    cursor: "pointer",
    border: "0.1px solid",
    padding: "1px",
    alignSelf: "flex-end"
  },
  reminder: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
});

const DayBox = ({
  className,
  date,
  reminders,
  onEditReminder,
  onAddReminder,
  onRemoveReminders
}) => {
  const classes = useBoxStyles();

  return (
    <div className={`${className} ${classes.container}`}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box pl="3px">{getDayFromSTRDate(date)}</Box>
        <Box>
          <span
            id={`add-${date}`}
            style={{
              backgroundColor: "lightgreen"
            }}
            className={`${classes.actions}`}
            onClick={() => onAddReminder(date)}
          >
            Add
          </span>
          <span
            className={`${classes.actions}`}
            style={{
              backgroundColor: "lightsalmon"
            }}
            onClick={() => onRemoveReminders(date)}
          >
            Remove all
          </span>
        </Box>
      </Box>
      <div className={`${classes.reminderList}`}>
        <ul>
          {reminders &&
            reminders.map(reminder => (
              <li key={reminder.id}>
                <div
                  className={`${classes.reminder}`}
                  onClick={() => onEditReminder(reminder)}
                >
                  {`${reminder.time} ${reminder.text}`}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default () => {
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [reminders, setReminders] = useState([]);
  const classes = useStyles();

  const [selectedMonth, setSelectedMonth] = useState({
    year: NOW.getFullYear(),
    month: NOW.getMonth()
  });

  const onSelectReminder = reminder => {
    alert(reminder);
  };

  const onAddReminder = date => {
    alert(`MOCKING add reminder for this date ${date}}`);
    setReminders(
      reminders.concat([
        {
          id: `${date}-${Math.random()
            .toString(16)
            .slice(-4)}`,
          date,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          text: `This is a mocked Reminder ${Math.random()
            .toString(16)
            .slice(-4)}`
        }
      ])
    );
  };

  const onRemoveReminders = date => {
    alert(`Remove all reminders for this date ${date}`);
  };

  const daysWithReminder = getCalendarDays(selectedMonth).map(date => {
    return {
      date,
      dateReminders: reminders.filter(rmd => rmd.date === date)
    };
  });

  return (
    <Box height="600px">
      <div className={classes.calendarContainer}>
        {[
          "Sunday",
          "Monday",
          "Tuestday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ].map(day => (
          <div className={`${classes.itemDaysLabel} ${classes.item}`} key={day}>
            {day}
          </div>
        ))}
        {daysWithReminder.map(({ date, dateReminders }) => (
          // component rendering a single box per day
          <DayBox
            className={classes.item}
            key={date}
            date={date}
            reminders={dateReminders}
            onEditReminder={onSelectReminder}
            onAddReminder={onAddReminder}
            onRemoveReminders={onRemoveReminders}
          />
        ))}
      </div>
    </Box>
  );
};
