<script>
  // import { onMount } from "svelte";
  import { createSlide } from "../utils/anim.js";
  import CountryImage from "../components/CountryImage.svelte";
  import DateString from "../components/DateString.svelte";
  import PostId from "../components/PostId.svelte";

  let autoHeight = false;
  const slideFn = createSlide({
    loopBegin: () => {
      autoHeight = false;
    },
    loopComplete: () => {
      autoHeight = true;
    },
  });

  export let postInfo = {};
  let { _id, value, country, date, animation = false } = postInfo;

  $: {
    //Update on change value
    if (value != postInfo.value) {
      value = postInfo.value;
      date = new Date();
    }
  }
</script>

<div class:animation transition:slideFn={animation} class:autoHeight>
  <div class="post">
    <div class="desc">
      <div>
        <PostId {_id} />
        <DateString {date} />
        {#if country}
          <CountryImage {country} />
        {/if}
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

  .autoHeight {
    height: auto !important;
    overflow: auto;
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
