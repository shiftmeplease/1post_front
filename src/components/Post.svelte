<script>
  // import { onMount } from "svelte";
  import { createSlide } from "../utils/anim.js";
  import CountryImage from "../components/CountryImage.svelte";
  import DateString from "../components/DateString.svelte";
  import PostId from "../components/PostId.svelte";
  import { afterUpdate, onMount, space } from "svelte/internal";

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
  let { _id, value, country, date, animation = false, md } = postInfo;
  let additionalInfo;

  let Element;

  if (!date) date = new Date();

  $: {
    //Update on change value
    if (value != postInfo.value) {
      value = postInfo.value;
      md = postInfo.md;
      date = new Date();
      additionalInfo = `| ${md.length} symbols | ${
        md.split(/\n/g).length
      } lines`;
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

  function linksProcessor(node) {
    const links = node.querySelectorAll(".postBody a");
    if (links.length === 0) return;
    for (let link of links) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  }

  afterUpdate(() => {
    linksProcessor(Element);
    imageClick(Element);
  });
</script>

<div
  class="borderStyle"
  class:animation
  transition:slideFn={animation}
  class:autoHeight
  bind:this={Element}
>
  <div class="post">
    <div class="desc">
      <div>
        <PostId {_id} />
        <DateString {date} />
        {#if country}
          <CountryImage {country} />
        {/if}
        {#if additionalInfo}
          <span> {additionalInfo} </span>
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
    // background-color: $postBgColor;
    background: linear-gradient(
      90deg,
      $postBgColor 10%,
      $postBgColorHover 100%
    );
    transition: all 0.3s ease-in-out;
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
    background: linear-gradient(
      90deg,
      $postBgColorHover 10%,
      $postBgColorHover 100%
    );
  }
  .postBody {
    font-size: 1.2em;
    min-height: 2em;
    overflow-wrap: break-word;
    padding: 0 1em;
  }
  .desc {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.5em;
  }
</style>
