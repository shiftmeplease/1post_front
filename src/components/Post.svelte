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
      console.log(link.getAttribute("target"));
      if (link.getAttribute("target") !== "_blank") {
        link.innerHTML += `<svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="m9.33318 10.6667h-8v-8.00003h3.33333v-1.33334h-3.706665c-.26-.00666-.506666.08667-.686666.26667-.186667.17333-.28000037.42-.2733337.67333v8.79337c-.00666667.2533.0866667.4933.2733337.6733.18.18.433333.2733.686666.2667h8.746665c.53329 0 .95999-.42.95999-.94v-3.73337h-1.33332zm.39333-9.33337h-2.39333c-.36667 0-.66667-.3-.66667-.666663 0-.366667.3-.666667.66667-.666667h4.00002c.3666 0 .6666.3.6666.666667v4.000003c0 .36666-.3.66666-.6666.66666-.3667 0-.6667-.3-.6667-.66666v-2.39334l-2.74665 2.74667c-.26.26-.68.26-.94 0s-.26-.68 0-.94z" fill="currentColor"></path></svg>`;
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
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
