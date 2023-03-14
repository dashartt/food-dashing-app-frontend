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
        border: "1px solid border-gray-400",
      }}
      format="HH:mm"
      disableDayPicker
      plugins={[
        <TimePicker
          onSelect={(v) => console.log(v)}
          hideSeconds
          key={uuid()}
        />,
      ]}
    />
  );
}
