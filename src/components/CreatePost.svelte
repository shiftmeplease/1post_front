<script>
  import Post from "./Post.svelte";
  import { mdrender } from "../utils/md.js";
  import { createEventDispatcher, onMount } from "svelte";
  import mockMessage from "../utils/mockMessage.js";

  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();

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
      previewPost = { ...previewPost, value: previewHtml, md: value };
    }
  }

  async function handleClick() {
    const response = await fetch(`${host}/api/post/`, {
      method: "PUT",
      body: JSON.stringify({ value }),
      headers: { "Content-Type": "application/json" },
    });

    const { success, post, message } = await response.json();
    if (success) {
      dispatch("postCreated", { ...post, animation: { duration: 500 } });
      value = "";
    } else {
      addNotification({
        text: message,
        position: "bottom-right",
      });
    }
  }

  onMount(() => {
    value = mockMessage;
  });
</script>

<div class="postInput break">
  <textarea
    bind:value
    placeholder="Remember, be nice! Max 300 symbols, 15 lines"
    rows="10"
  />
  <div class="preview">
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
    @include border;
    overflow: auto;
    // max-width: 100%;
    // margin: auto;
    @include maxContentWidth;

    > textarea {
      padding: 1em;
      @include borderBottom;
      resize: vertical;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1.2em;
      // max-width: min-content;
    }
    button {
      // max-width: 1000px;
      box-sizing: border-box;
      padding: 1em;
      border: 0;
    }
  }

  .preview {
    max-width: 100%;
    margin: auto;
    margin: 0;
  }
  .break {
    margin-top: 3.5em !important;
    margin-bottom: 1em;
  }
</style>
