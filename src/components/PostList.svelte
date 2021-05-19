<script>
  import { onMount, onDestroy } from "svelte";
  import Post from "./Post.svelte";
  import TriggerPost from "./TriggerPost.svelte";
  import { postsStore } from "../stores/posts.js";
  import { scrollStore } from "../stores/scroll.js";
  import { host } from "../appConfig.js";

  import * as animateScroll from "svelte-scrollto";
  animateScroll.setGlobalOptions({ container: ".list" });

  export let pageSize = 0;
  export let triggerNum = 5;
  export let expanded = false;

  //TODO add filter/sort
  // $: {
  //   console.log({ post: expanded });
  // }
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
  // let posts = [];
  let prevLength;
  //   let isLoadingMore = false;

  async function fetchData() {
    // const fetchRes = await fetch(`${host}/api/post/page/`, {
    //   method: "POST",
    //   body: JSON.stringify({ sortType: "newest", pageNum: page }),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const jsonRes = await fetchRes.json();
    // if (jsonRes.success) {
    //   const { posts } = jsonRes;
    //   prevLength = posts.length;
    //   postsStore.add(posts);
    // }
    const pss = [
      { value: "23456", _id: 1 },
      { value: "234561", _id: 2 },
      { value: "23456112", _id: 3 },
      { value: "23456112", _id: 4 },
      { value: "23456112789", _id: 5 },
      { value: "23456112789", _id: 6 },
      { value: "23456112789", _id: 7 },
      { value: "23456112789", _id: 8 },
      { value: "23456112789sdfg", _id: 9 },
      { value: "23456112789sdfgljhbnmk", _id: 10 },
    ];
    prevLength = pss.length;
    postsStore.add(pss);
  }

  onMount(() => {
    fetchData();
  });

  const loadMore = () => {
    page++;
    fetchData();
  };
  let fetchedAll = false;

  const onTrigger = () => {
    console.log(prevLength, pageSize, prevLength <= pageSize);
    if (prevLength === pageSize) {
      loadMore();
    } else {
      fetchedAll = true;
    }
    //TODO Queue, error handling when bad connection
  };

  // $: posts = [...posts, ...newPosts];

  function handleScroll(e) {
    const { deltaY } = e;
    // const { screenY, clientY, y, layerY, deltaY } = e;
    // console.log(currentScrollPos);

    // if (!prevScrollpos) {
    //   prevScrollpos = currentScrollPos;
    //   return;
    // }
    // if(prevScrollpos currentScrollPos)
    // console.log(prevScrollpos, currentScrollPos);
    if (deltaY < 0) {
      scrollStore.setProp("state", "up");
    } else if (deltaY > 0) {
      scrollStore.setProp("state", "down");
    }
    // prevScrollpos = currentScrollPos;
  }
</script>

<div
  class="list"
  class:expanded
  on:touchmove|passive={handleScroll}
  on:wheel|passive={handleScroll}
>
  {#each posts as post, i (post._id)}
    {#if pageSize - (i % 10) !== triggerNum}
      <Post {post} />
    {:else}
      <TriggerPost {post} on:inViewport|once={onTrigger} />
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
    transition: margin-top 0.4s;
    margin-top: 0;
    /* position: relative; */
    /* top: -11em; */
    transition: top 0.5s;
  }
  .expanded {
    /* top: 0em; */
  }
</style>
