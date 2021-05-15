import { writable } from "svelte/store";

function createStore() {
  const { subscribe, update, set } = writable(false);

  return {
    subscribe,
    switch: () => {
      update((val) => {
        return !val;
      });
    },
    reset: () => {
      set(false);
    },
    set,
  };
}
const scrollStore = createStore();

export { scrollStore };
