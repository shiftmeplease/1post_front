<script>
  import { createEventDispatcher } from "svelte";
  import Post from "./Post.svelte";
  export let postInfo = {};
  const dispatch = createEventDispatcher();
  let element;
  let fired = false;
  //TODO rmk to intersection observer
  function isInViewport(e) {
    if (fired) return;
    const rect = element.getBoundingClientRect();
    const inSide = rect.bottom <= innerHeight && rect.right <= innerWidth;
    if (inSide) {
      fired = true;
      dispatch("inViewport", true);
    }
  }
</script>

<svelte:window
  {innerHeight}
  {innerWidth}
  on:touchmove={isInViewport}
  on:wheel={isInViewport}
/>

<div class="upd" bind:this={element}>
  <Post {postInfo} />
</div>

<style>
  .upd {
    background-color: antiquewhite;
    /* color: rgb(255, 218, 170); */
  }
</style>
