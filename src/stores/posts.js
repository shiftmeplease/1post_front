import { writable } from "svelte/store";

function createStore() {
  const { subscribe, update, set } = writable([]);

  return {
    subscribe,
    add: (posts) => {
      if (Array.isArray(posts)) {
        const sortedPosts = posts.sort((a, b) => {
          return a._id - b._id;
        });

        update((value) => {
          return [...value, ...sortedPosts];
        });
      } else {
        update((value) => {
          //in case of one post => push to the top
          return [posts, ...value];
        });
      }
    },
    reset: () => {
      set([]);
    },
  };
}
const postsStore = createStore();

export { postsStore };
