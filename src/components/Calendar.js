import React, { useState } from "react";
import { getCalendarDays, getDateFromDateTime } from "../utils/calendarUtils";
import DayBox from "./DayBox";
import ReminderEditor from "./ReminderEditor";
import { makeStyles } from "@material-ui/styles";
import { Box, Modal } from "@material-ui/core";
import { DEFAULT_CITIES } from "../commons";

const NOW = new Date();
const DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuestday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

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
  modalContainer: {
    top: `20%`,
    left: `20%`,
    position: "absolute",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #000",
    padding: "10px",
    backgroundColor: "white"
  }
});

export default () => {
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [reminders, setReminders] = useState(null);
  const classes = useStyles();

  const [selectedMonth, setSelectedMonth] = useState({
    year: NOW.getFullYear(),
    month: NOW.getMonth() + 1
  });

  const onSelectReminder = reminder => {
    console.log(reminder);
    setSelectedReminder(reminder);
  };

  const onEditReminder = reminder => {
    const remId = reminder.id
      ? reminder.id
      : `${reminder.dateTime}-${Math.random()
          .toString(16)
          .slice(-4)}`;
    setReminders({
      ...reminders,
      ...{
        [remId]: { ...reminder, ...{ id: remId } }
      }
    });
    setSelectedReminder(null);
  };

  const onAddReminder = date => {
    setSelectedReminder({
      text: "",
      dateTime: `${date}T12:00`,
      color: "green",
      city: DEFAULT_CITIES[0][1]
    });
  };

  const onDeleteReminder = reminder => {
    const { [reminder.id]: unwanted, ...restReminders } = reminders;
    setReminders(restReminders);
    setSelectedReminder(null);
  };

  const onRemoveReminders = date => {
    alert(`SOON it will remove all reminders for the following date: ${date}`);
  };

  const daysWithReminder = getCalendarDays(selectedMonth).map(date => {
    return {
      date,
      dateReminders: reminders
        ? [...Object.values(reminders)].filter(
            rmd => getDateFromDateTime(rmd.dateTime) === date
          )
        : []
    };
  });

  return (
    <>
      <Modal
        open={!!selectedReminder}
        onClose={() => setSelectedReminder(null)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <ReminderEditor
            className={classes.modalContainer}
            reminder={selectedReminder}
            onSave={onEditReminder}
            onDelete={onDeleteReminder}
          />
        </div>
      </Modal>
      <Box height="600px">
        <div className={classes.calendarContainer}>
          {DAYS_OF_THE_WEEK.map(day => (
            <Box
              display="flex"
              border="1px solid"
              bgcolor="lightBlue"
              alignItems="center"
              justifyContent="center"
              key={day}
            >
              {day}
            </Box>
          ))}
          {daysWithReminder.map(({ date, dateReminders }) => (
            // component rendering a single box per day
            <DayBox
              display="flex"
              border="1px solid"
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
    </>
  );
};
