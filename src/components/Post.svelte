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

  if (!date) date = new Date();

  $: {
    //Update on change value
    if (value != postInfo.value) {
      value = postInfo.value;
      date = new Date();
    }
  }
  function imageClick(node) {
    const images = node.querySelectorAll(".postBody img");
    if (images.length === 0) return;
    for (let image of images) {
      let maxed = false;
      image.addEventListener("click", (ev) => {
        if (!maxed) {
          image.style.cssText = "max-width: 100%; max-height: 100%;";
        } else {
          image.style.cssText = "";
        }
        maxed = !maxed;
      });
    }
  }
</script>

<div
  class="borderStyle"
  class:animation
  transition:slideFn={animation}
  class:autoHeight
  use:imageClick
>
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

<style lang="scss">
  @import "../styles/colors.scss";
  @import "../styles/mixins.scss";

  .borderStyle {
    @include borderBottom();
  }
  .post {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    /* TODO make '...' to view post */
    overflow: hidden;
    padding: 1em;
    background-color: $postBgColor;
  }

  .animation {
    overflow: hidden;
    z-index: -999;
  }

  .autoHeight {
    height: auto !important;
    overflow: auto;
  }

  .post:hover {
    background-color: $postBgColorHover;
  }
  .postBody {
    font-size: 1.2em;
    min-height: 2em;
    overflow-wrap: break-word;
    padding: 0 1em 0.5em 1em;
  }
  .desc {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.5em;
  }
</style>
