<script>
  // import { onMount } from "svelte";
  import { slide } from "../utils/anim.js";

  let autoHeight = false;
  const slideObj = slide();
  const { slideFn } = slideObj;
  slideObj.loopBegin = () => {
    autoHeight = false;
  };

  slideObj.loopComplete = () => {
    autoHeight = true;
  };

  export let post = {};
  let {
    _id,
    value,
    country = "AQ",
    date = new Date(),
    animation = false,
    viewPost = false,
  } = post;

  country = country.toLowerCase();
  $: {
    value = post.value;
    if (!_id) date = new Date();
  }
</script>

<div
  class:animation
  class:viewPost
  transition:slideFn={animation}
  class:autoHeight
>
  <div class="post">
    <div class="desc">
      <div>
        {#if _id}<a class="idHref" href="/#">#{_id}</a>
        {:else}
          <span class="idHref" href="/#">#???</span>
        {/if}
        <span class="date"
          >{new Date(date)
            .toUTCString()
            .split(",")[1]
            .replace(" GMT", "")}</span
        >
        {#if country}
          <img
            class="flag"
            src={`https://www.countryflags.io/${country}/flat/32.png`}
            alt={country}
          />{/if}
      </div>
    </div>
    <div class="postBody">{@html value}</div>
  </div>
</div>

<style>
  .post {
    margin: 0.1em 1em;
    flex-grow: 1;
    display: flex;
    background-color: #d8d8d8;
    flex-direction: column;
    border: 0.1em solid #d1d1d1;
    /* transition: 0.2s all ease-in-out; */

    /* TODO make ... to view post */
    overflow: hidden;
    padding: 1em;

    /* transition: all 0.5s ease-in-out; */
    /* height: 0; */
    /* padding: 0; */
  }
  /* .post :global(p) {
    margin: 0;
  } */
  .animation {
    /* transform: scaleY(0); */
    /* transform-origin: top; */
    /* transition: transform 0.25s ease; */
    overflow: hidden;
    /* transition: all 5s ease-in-out; */
    /* max-height: 0px; */
    z-index: -999;
  }
  /* .viewPost {
    /* overflow: auto; 
  }*/

  .autoHeight {
    height: auto !important;
    overflow: auto;
  }
  .flag {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    padding: 0;
    margin: 0;
    flex-grow: 0;
    width: 32px;
    height: 32px;
  }
  .post:hover {
    background-color: #eeeeee;
  }
  .postBody {
    font-size: 1.2em;
    min-height: 2em;
    overflow-wrap: break-word;
  }
  .desc {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.5em;
    opacity: 77%;
  }
</style>
