import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";

import { getDayFromDate, getTimeFromDateTime } from "../utils/calendarUtils";

const useBoxStyles = makeStyles({
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
    overflow: "hidden",
    cursor: "pointer"
  }
});

const DayBox = ({
  className,
  date,
  reminders,
  onEditReminder,
  onAddReminder,
  onRemoveReminders,
  ...rest
}) => {
  const classes = useBoxStyles();

  if (reminders) {
    reminders.sort((a, b) => {
      const [bHours, bMinutes] = getTimeFromDateTime(b.dateTime).split(":");
      const [aHours, aMinutes] = getTimeFromDateTime(a.dateTime).split(":");

      if (bHours === aHours) {
        return aMinutes - bMinutes;
      } else {
        return aHours - bHours;
      }
    });
  }

  return (
    <Box display="flex" flexDirection="column" {...rest}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box pl="3px">{getDayFromDate(date)}</Box>
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
        <ul style={{ paddingLeft: "20px" }}>
          {reminders &&
            reminders.map(reminder => (
              <li key={reminder.id} style={{ textAlign: "left" }}>
                <Box
                  className={`${classes.reminder}`}
                  bgcolor={`${reminder.color}`}
                  onClick={() => onEditReminder(reminder)}
                >
                  {`${getTimeFromDateTime(reminder.dateTime)} ${reminder.text}`}
                </Box>
              </li>
            ))}
        </ul>
      </div>
    </Box>
  );
};

export default DayBox;
