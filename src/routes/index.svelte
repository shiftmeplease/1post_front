<script>
  import PostList from "../components/PostList.svelte";
  import CreatePost from "../components/CreatePost.svelte";
  import { postsStore } from "../stores/posts.js";
  import { scrollStore } from "../stores/scroll.js";
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
    on:postCreated={({ detail: post }) => {
      postsStore.add(post);
      scrollStore.set(true);
    }}
  />
  <PostList pageSize={10} triggerNum={3} />
</main>

<!-- TODO https://preview.npmjs.com/package/marked -->
