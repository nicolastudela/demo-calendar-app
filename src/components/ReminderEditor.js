import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DEFAULT_CITIES, DEFAULT_COLORS } from "../commons";
import api from "../api";

const useBoxStyles = makeStyles({
  textField: {
    marginBottom: "20px"
  }
});

const ReminderEditor = ({ reminder, onSave, onDelete, ...rest }) => {
  const [editedReminder, setEditedRemider] = useState(reminder);
  const [city, setCity] = useState({ city: editedReminder.city });
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function getForecast() {
      const forecast = await api.fetchWeather(city.city);
      setForecast(forecast);
    }
    getForecast();
  }, [city]);

  const classes = useBoxStyles();

  const handleChange = name => event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    if (name === "city") {
      setCity({ city: value });
    }

    setEditedRemider({
      ...editedReminder,
      [name]: value
    });
  };

  const onSubmit = () => {
    onSave(editedReminder);
  };

  const onDeleteAction = () => {
    onDelete(editedReminder);
  };

  return (
    <Box display="flex" minWidth="300px" flexDirection="column" {...rest}>
      <form>
        <TextField
          id="reminder-text"
          label="reminderText"
          helperText="Please enter your reminder"
          multiline
          rowsMax="4"
          value={editedReminder.text}
          onChange={handleChange("text")}
          margin="normal"
          variant="outlined"
          fullWidth
          className={classes.textField}
        />
        <TextField
          id="time"
          label="reminder-time"
          type="datetime-local"
          defaultValue={reminder.dateTime}
          onChange={handleChange("dateTime")}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          className={classes.textField}
        />
        <TextField
          id="city"
          select
          // label="reminder-city"
          value={editedReminder.city}
          onChange={handleChange("city")}
          SelectProps={{
            native: true
          }}
          helperText="Please select your city"
          margin="normal"
          variant="outlined"
          fullWidth
          className={classes.textField}
        >
          {DEFAULT_CITIES.map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </TextField>
        {forecast && (
          <Box display="flex" flexDirection="row">
            {`Forecast:`}
            {forecast.map(({ weather, dateTime }) => (
              <Box ml="2px" key={weather}>
                {weather}
              </Box>
            ))}
          </Box>
        )}
        <TextField
          id="color"
          select
          value={editedReminder.color}
          onChange={handleChange("color")}
          SelectProps={{
            native: true
          }}
          helperText="Please select the color"
          margin="normal"
          variant="outlined"
          fullWidth
          className={classes.textField}
        >
          {DEFAULT_COLORS.map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </TextField>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            id="save-reminder"
            onClick={onSubmit}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onDeleteAction}
            disabled={!editedReminder.id}
            id="delete-reminder"
          >
            Delete
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReminderEditor;
