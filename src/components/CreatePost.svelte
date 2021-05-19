<script>
  //   import marked from "marked";
  import Post from "./Post.svelte";
  import DOMPurify from "dompurify";
  import MarkdownIt from "markdown-it";
  import { createEventDispatcher } from "svelte";

  import { host } from "../appConfig.js";

  export let expanded = false;
  const dispatch = createEventDispatcher();

  //TODO better preview;  with styles;
  //TODO image sizing, overflow..
  //TODO image full size on click

  const md = MarkdownIt();
  let previewPost = { animation: { duration: 500 } };
  let value = "";
  let previewHtml = "";
  let initiated = false;
  $: {
    //TODO fix this workaround
    if (value !== "" || initiated) {
      if (!initiated) initiated = true;
      previewHtml = DOMPurify.sanitize(md.render(value));
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
</script>

<div class="postInput" class:expanded>
  <textarea bind:value placeholder="Remember, be nice!" rows="5" />
  <div>
    {#if previewHtml}
      <Post post={previewPost} />
    {/if}
  </div>
  <button on:click={handleClick}>POST</button>
</div>

<style>
  .postInput {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;
    top: 3.5em;
    /* top: 0px; */
    transition: top 1s;
    z-index: 998;
  }
  .expanded {
    top: 0.5em;
  }
  .postInput > textarea {
    border: 0.1em solid #d1d1d1;
    padding: 1em;
    outline: none;
    margin: 0.1em 1em;
  }
</style>
