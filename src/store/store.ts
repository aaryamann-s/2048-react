import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {

  username: string | null;
  setUser: (name: string) => void;
  removeUser: () => void;
}

const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: null,
      setUser: (name) => set({ username: name }),
      removeUser: () => set({ username: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(()=> sessionStorage),
    }
  )
);


export default useStore;