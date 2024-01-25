import { create } from "zustand";

interface UserState {
    username: string | null,
    setUser: (name: string) => void,
    removeUser: () => void
  }

const useStore = create<UserState>((set) => ({
  username: null,
  setUser: (name) => set({ username: name}),
  removeUser: () => set({username: null})
}));

export default useStore;