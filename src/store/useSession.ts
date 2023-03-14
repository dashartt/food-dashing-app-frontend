import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ISession {
  _id?: string;
  fullName: string;
  email: string;
  addresses: string[] | [];
  role: string;
}

interface SessionState {
  session: ISession | null;
  setSession: (session: ISession | null) => void;
  clearSession: () => void;

  path: string;
  setPath: (path: string) => void;
}

const useSessionState = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),

      path: "",
      setPath: (path) =>
        set((state) => ({ path: path !== "" ? path : state.path })),
    }),
    {
      name: "session-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        path: state.path,
        session: state.session,
      }),
    }
  )
);

export default useSessionState;
