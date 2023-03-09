"use client";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { v4 as uuid } from "uuid";

export default function TimeInput() {
  return (
    <DatePicker
      portal
      style={{
        width: "5rem",
        textAlign: "center",
        padding: "1.2rem 1.1rem",
      }}
      format="HH:mm"
      disableDayPicker
      plugins={[<TimePicker hideSeconds key={uuid()} />]}
    />
  );
}
