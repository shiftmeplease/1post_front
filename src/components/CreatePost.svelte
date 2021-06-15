<script>
  import Post from "./Post.svelte";
  import { mdrender } from "../utils/md.js";
  import { createEventDispatcher, onMount } from "svelte";
  import mockMessage from "../utils/mockMessage.js";

  import { host } from "../appConfig.js";

  const dispatch = createEventDispatcher();

  //TODO better preview;  with styles;
  //TODO image sizing, overflow..
  //TODO image full size on click

  let previewPost = { animation: { duration: 500 }, preview: true };
  let value = "";
  let previewHtml = "";
  let initiated = false;
  $: {
    //TODO fix this workaround
    if (value !== "" || initiated) {
      if (!initiated) initiated = true;
      previewHtml = mdrender(value);
      previewPost = { ...previewPost, value: previewHtml };
    }
  }

  async function handleClick() {
    const response = await fetch(`${host}/api/post/`, {
      method: "PUT",
      body: JSON.stringify({ value }),
      headers: { "Content-Type": "application/json" },
    });

    const { success, post } = await response.json();
    if (success) {
      dispatch("postCreated", { ...post, animation: { duration: 500 } });
      value = "";
    }
  }

  onMount(() => {
    value = mockMessage;
  });
</script>

<div class="postInput break">
  <textarea bind:value placeholder="Remember, be nice!" rows="5" />
  <div>
    {#if previewHtml}
      <Post postInfo={previewPost} />
    {/if}
  </div>
  <button on:click={handleClick}>POST</button>
</div>

<style lang="scss">
  @import "../styles/colors.scss";
  @import "../styles/mixins.scss";

  .postInput {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    transition: margin-top 0.3s;
    z-index: 998;
    box-sizing: border-box;
    max-width: 1000px;
    margin: auto;
    @include border;

    > textarea {
      padding: 1em;
      @include borderBottom;
      resize: vertical;
    }
    button {
      // max-width: 1000px;
      box-sizing: border-box;
      padding: 1em;
      border: 0;
    }
  }
  .break {
    margin-top: 3.5em !important;
    margin-bottom: 1em;
  }
</style>
