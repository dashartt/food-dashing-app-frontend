import create from "zustand";

interface IScheduleOrder {
  scheduleOption: string;
  chosenTime?: string;
}

interface ScheduleOrderState {
  scheduleOption: string;
  chosenTime?: string;
  setScheduleOrder: (scheduleOrderDTO: Partial<IScheduleOrder>) => void;
}

const useScheduleState = create<ScheduleOrderState>((set) => ({
  scheduleOption: "now",
  chosenTime: "19:00",
  setScheduleOrder: (scheduleOrderDTO) => set({ ...scheduleOrderDTO }),
}));

export default useScheduleState;
