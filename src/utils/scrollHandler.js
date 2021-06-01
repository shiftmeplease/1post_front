import { scrollStore } from "../stores/scroll.js";

export const handleScroll = (e) => {
  const { deltaY } = e;
  if (deltaY < 0) {
    scrollStore.setProp("state", "up");
  } else if (deltaY > 0) {
    scrollStore.setProp("state", "down");
  }
};
