import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ISession {
  token: string;
  fullName: string;
}

interface SessionState {
  session: ISession | null;
  setSession: (session: ISession) => void;

  path: string;
  setPath: (path: string) => void;
}

const useSessionState = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: ({ fullName, token }) =>
        set((state) => ({ ...state, session: { fullName, token } })),

      path: "",
      setPath: (path) =>
        set((state) => ({ ...state, path: path !== "" ? path : state.path })),
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
