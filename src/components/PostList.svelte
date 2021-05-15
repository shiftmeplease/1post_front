<script>
  import { onMount, onDestroy } from "svelte";
  import Post from "./Post.svelte";
  import TriggerPost from "./TriggerPost.svelte";
  import { postsStore } from "../stores/posts.js";
  import { scrollStore } from "../stores/scroll.js";
  import { host } from "../appConfig.js";

  import * as animateScroll from "svelte-scrollto";
  import { debug } from "svelte/internal";
  animateScroll.setGlobalOptions({ container: ".list" });

  export let pageSize = 0;
  export let triggerNum = 5;

  //TODO add filter/sort
  let posts = [];
  const unsub = postsStore.subscribe((val) => {
    posts = val;
  });

  const unsub2 = scrollStore.subscribe((scroll) => {
    if (scroll) {
      animateScroll.scrollTo({
        element: ".list :first-child",
        duration: 200,
        onDone: () => {
          scrollStore.reset();
        },
      });
    }
  });

  onDestroy(() => {
    unsub();
    unsub2();
  });

  let page = 1;
  // let posts = [];
  let prevLength;
  //   let isLoadingMore = false;

  async function fetchData() {
    const fetchRes = await fetch(`${host}/api/post/page/`, {
      method: "POST",
      body: JSON.stringify({ sortType: "newest", pageNum: page }),
      headers: { "Content-Type": "application/json" },
    });
    const jsonRes = await fetchRes.json();
    if (jsonRes.success) {
      const { posts } = jsonRes;
      prevLength = posts.length;
      postsStore.add(posts);
    }
  }

  onMount(() => {
    fetchData();
  });

  const loadMore = () => {
    page++;
    fetchData();
  };

  const onTrigger = () => {
    if (prevLength === pageSize) {
      loadMore();
    }
    //TODO Queue, error handling when bad connection
  };

  // $: posts = [...posts, ...newPosts];
</script>

<div class="list">
  {#each posts as post, i (post._id)}
    {#if pageSize - (i % 10) !== triggerNum}
      <Post {post} />
    {:else}
      <TriggerPost {post} on:inViewport|once={onTrigger} />
    {/if}
  {/each}
</div>

<style>
  .list {
    overflow: scroll;
    max-height: 100vh;
  }
</style>
