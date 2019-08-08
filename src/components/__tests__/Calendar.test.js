import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import Calendar from "../Calendar";
import {
  formattedDateTime,
  getDateFromDateTime,
  getTimeFromDateTime
} from "../../utils/calendarUtils";
import api from "../../api";

jest.mock("../../api");

describe("Calendar", () => {
  it("adds one reminder with defined text and date", async () => {
    const { getByTestId, getByText, getByLabelText } = render(<Calendar />);
    const todayDateTime = formattedDateTime(new Date());
    const todayAddButton = getByTestId(
      `add-${getDateFromDateTime(todayDateTime)}`
    );

    // mocking weather service
    const resp = Promise.resolve([{ weather: "sunny", id: "weather-id" }]);
    api.fetchWeather.mockResolvedValue(resp);

    // clicking on the add button for today cell
    todayAddButton.click();

    //waiting for modal to be ready
    await wait(() => expect(getByText("Save")).toBeTruthy());

    // checking weather service to have been called
    expect(api.fetchWeather).toHaveBeenCalledTimes(1);

    // Default city
    expect(api.fetchWeather).toHaveBeenCalledWith(
      "Ciudad Autónoma de Buenos Aires,ar"
    );

    // disabled button should be disabled since it's a new reminder
    expect(getByText("Delete").parentNode).toHaveAttribute("disabled");

    // filling reminder text
    const reminderText = "Test Reminder Description";
    fireEvent.change(getByLabelText("reminderText"), {
      target: { value: reminderText }
    });

    // filling reminder time
    fireEvent.change(getByLabelText("reminder-time"), {
      target: { value: todayDateTime }
    });

    getByText("Save").click();

    expect(
      getByText(`${getTimeFromDateTime(todayDateTime)} ${reminderText}`, {
        exact: true
      })
    ).toBeTruthy();
  });
});
