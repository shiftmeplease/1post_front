import { writable } from "svelte/store";

function createStore() {
  const { subscribe, update, set } = writable({});

  return {
    subscribe,
    reset: () => {
      set({});
    },
    setProp: (prop, value) => {
      update((store) => {
        store[prop] = value;
        return store;
      });
    },
  };
}
const scrollStore = createStore();

export { scrollStore };
