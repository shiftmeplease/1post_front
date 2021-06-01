<script>
  import PostList from "../components/PostList.svelte";
  import CreatePost from "../components/CreatePost.svelte";
  import { onDestroy } from "svelte";
  import { scrollStore } from "../stores/scroll.js";
  import { postsStore } from "../stores/posts.js";

  let squeezed = false;
  const unsub = scrollStore.subscribe(({ state }) => {
    squeezed = state === "down" ? true : false;
  });

  onDestroy(() => {
    unsub();
  });
</script>

<svelte:head>
  <title>1PO.ST</title>
</svelte:head>

<main>
  <!-- <div>Lucky button</div>
  <div>search button</div>
  <div>create post</div>
  <div>posts</div> -->
  <!-- If touch, then postList should be loaded earlier, triggernum bigger -->
  <CreatePost
    {squeezed}
    on:postCreated={({ detail: post }) => {
      postsStore.add(post);
      scrollStore.setProp("scrollToTop", true);
    }}
  />
  <PostList pageSize={10} triggerNum={5} />
</main>

<!-- TODO https://preview.npmjs.com/package/marked -->
