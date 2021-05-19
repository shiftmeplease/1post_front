<script>
  import { scrollStore } from "../stores/scroll.js";
  import { onDestroy } from "svelte";
  import CreatePost from "./CreatePost.svelte";

  let hidden = false;

  const unsub = scrollStore.subscribe(({ state }) => {
    hidden = state === "down" ? true : false;
  });

  onDestroy(() => {
    unsub();
  });
</script>

<header class:hidden>
  <div class="header">
    <a href="/" class="logo">1PO.ST</a>

    <span class="description"> Post anything. Once.</span>
  </div>
</header>

<style>
  header {
    background-color: #1b1b1b;

    position: fixed;
    width: 100%; /* Full width */
    transition: top 0.5s;
    top: 0px;
    /* left: 0;
    right: 0;
    top: 0; */
    z-index: 999;
  }

  .hidden {
    top: -500px;
  }

  .header {
    padding: 0.5em 0.9em;
    justify-content: space-between;
    display: flex;
    flex-grow: 1;
    color: #1b1b1b;
    align-items: center;
    /* justify-content: center; */
    text-align: center;
  }
  .logo {
    font-size: 2em;
    font-family: "Titillium Web Semibold", sans-serif;
    text-decoration: none;
    color: #ebebeb;
    line-height: 0.9em;
  }

  .description {
    font-size: 1.3em;
    color: #a8a8a8;
    font-family: "Titillium Web", sans-serif;
    overflow-wrap: break-word;
    max-width: 7em;
    text-align: end;
    line-height: 0.9em;
  }
</style>
