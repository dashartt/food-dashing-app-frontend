"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TimepickerUI } from "timepicker-ui";

export default function ScheduleTimeInput() {
  const tmRef = useRef(null);
  const [inputValue, setInputValue] = useState("12:00 PM");

  const testHandler = useCallback((e: CustomEvent) => {
    setInputValue(`${e.detail.hour}:${e.detail.minutes} ${e.detail.type}`);
  }, []);

  useEffect(() => {
    const tm = tmRef.current as unknown as HTMLDivElement;

    const newPicker = new TimepickerUI(tm, {
      switchToMinutesAfterSelectHour: true,
      theme: "basic",
      timeLabel: "Escolha o horário",
      okLabel: "Confirmar",
      cancelLabel: "Fechar",
    });
    newPicker.create();

    // @ts-ignore
    tm.addEventListener("accept", testHandler);

    return () => {
      // @ts-ignore
      tm.removeEventListener("accept", testHandler);
    };
  }, [testHandler]);

  return (
    <div className="timepicker-ui" ref={tmRef}>
      <input className="timepicker-ui-input" defaultValue={inputValue} />
    </div>
  );
}
