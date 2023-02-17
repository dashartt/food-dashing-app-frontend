import create from "zustand";

interface BorderTypeState {
  borderType: string;
  setBorderType: (type: string) => void;
}

const useBorderType = create<BorderTypeState>((set) => ({
  borderType: "catupiry",
  setBorderType: (type) => set({ borderType: type }),
}));

export default useBorderType;
