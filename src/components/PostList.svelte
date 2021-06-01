<script>
  import { onMount, onDestroy } from "svelte";
  import Post from "./Post.svelte";
  import TriggerPost from "./TriggerPost.svelte";
  import { postsStore } from "../stores/posts.js";
  import { scrollStore } from "../stores/scroll.js";
  import { handleScroll } from "../utils/scrollHandler";
  import { host } from "../appConfig.js";

  import * as animateScroll from "svelte-scrollto";
  animateScroll.setGlobalOptions({ container: ".list" });

  export let pageSize = 0;
  export let triggerNum = 5;

  //TODO add filter/sort

  let posts = [];
  const unsub = postsStore.subscribe((storedPosts) => {
    //TODO sorting
    let sortedPosts = [...storedPosts.entries()]
      .sort((a, b) => b[0] - a[0])
      .map((val) => val[1]);

    posts = sortedPosts;
  });

  const unsub2 = scrollStore.subscribe(({ scrollToTop }) => {
    if (scrollToTop) {
      animateScroll.scrollTo({
        element: ".list :first-child",
        duration: 200,
        onDone: () => {
          scrollStore.setProp("scrollToTop", false);
        },
      });
    }
  });

  onDestroy(() => {
    unsub();
    unsub2();
  });

  let page = 1;

  let prevLength;

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

  let fetchedAll = false;

  const fetchTrigger = () => {
    console.log(prevLength, pageSize, prevLength <= pageSize);
    if (prevLength === pageSize) {
      page++;
      fetchData();
    } else {
      fetchedAll = true;
    }
    //TODO Queue, error handling when bad connection
  };
</script>

<div
  class="list"
  on:touchmove|passive={handleScroll}
  on:wheel|passive={handleScroll}
>
  {#each posts as postInfo, i (postInfo._id)}
    {#if pageSize - (i % 10) !== triggerNum}
      <Post {postInfo} />
    {:else}
      <TriggerPost {postInfo} on:inViewport|once={fetchTrigger} />
    {/if}
  {/each}
  {#if fetchedAll === true}
    <div>KONEC</div>
  {/if}
</div>

<style>
  .list {
    overflow: auto;
    /* max-height: 100vh; */
    /* position: relative; */
    /* top: -11em; */
  }
</style>
