import { create } from "zustand";

interface ANYTHINGLAHStore {
  data: {
    display: boolean;
  };
  actions: {
    setDisplay: (display: boolean) => void;
  };
}

function setDisplay(set: StoreSetter, display: boolean) {
  set(({ data }) => ({
    data: {
      ...data,
      display: display,
    },
  }));
}

type StoreSetter = (
  helper: (state: ANYTHINGLAHStore) => Partial<ANYTHINGLAHStore>
) => void;

const useANYTHINGLAHStore = create<ANYTHINGLAHStore>()((set) => ({
  data: { display: false },
  actions: {
    setDisplay: (display) => setDisplay(set, display),
  },
}));

export const useANYTHINGLAH = () => useANYTHINGLAHStore((state) => state.data);
export const useANYTHINGLAHAction = () =>
  useANYTHINGLAHStore((state) => state.actions);
