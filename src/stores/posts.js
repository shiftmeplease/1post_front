import { writable } from "svelte/store";

function createStore() {
  const { subscribe, update, set } = writable(new Map());

  return {
    subscribe,
    add: (newPosts) => {
      // if (Array.isArray(posts)) {
      //   const sortedPosts = posts.sort((a, b) => {
      //     return a._id - b._id;
      //   });
      if (!Array.isArray(newPosts)) {
        newPosts = [newPosts];
      }
      update((storedPosts) => {
        // if (storedPosts.size === 0) {
        //   for (let post of newPosts) {
        //     storedPosts.set(post._id, post);
        //   }
        // } else {
        //   for (let post of newPosts) {
        //     if (!storedPosts.has(post._id)) {
        //       storedPosts.set(post._id, post);
        //     }
        //   }
        // }
        for (let post of newPosts) {
          if (!storedPosts.has(post._id)) {
            storedPosts.set(post._id, post);
          }
        }

        return storedPosts;
      });
    },
    reset: () => {
      set(new Map());
    },
  };
}
const postsStore = createStore();

export { postsStore };
