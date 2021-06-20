<script>
  import { scrollStore } from "../stores/scroll.js";
  import { onDestroy } from "svelte";

  let hidden = false;

  const unsub = scrollStore.subscribe(({ state }) => {
    // hidden = state === "down" ? true : false;
    //TODO disabled scroll
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

<style lang="scss">
  @import "../styles/colors";
  @import "../styles/mixins";

  header {
    background: linear-gradient(90deg, $headerBgColor 0%, $mainColor 90%);

    // @include smallScreen {
    //   background: none;
    //   background-color: $accentColor;
    // }

    position: fixed;
    width: 100%;
    transition: top 0.5s;
    top: 0px;
    left: 0px;
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

    align-items: center;
    /* justify-content: center; */
    text-align: center;
    @include maxContentWidth;
  }

  .logo {
    font-size: 2em;
    font-family: "Titillium Web Semibold", sans-serif;
    text-decoration: none;
    color: $textColor;
    line-height: 0.9em;
  }

  .description {
    font-size: 1.3em;
    color: $textColor;
    font-family: "Titillium Web", sans-serif;
    overflow-wrap: break-word;
    max-width: 7em;
    text-align: end;
    line-height: 0.9em;
  }
</style>
