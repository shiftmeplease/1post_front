<script>
  import { onMount } from "svelte";
  import Post from "../components/Post.svelte";

  $: posts = [];

  onMount(async () => {
    const fetchRes = await fetch("http://localhost:5000/api/post/page/", {
      method: "POST",
      body: JSON.stringify({ sortType: "oldest", pageNum: 1 }),
      headers: { "Content-Type": "application/json" },
    });
    const jsonRes = await fetchRes.json();
    if (jsonRes.success) {
      posts.sort;
      posts = jsonRes.posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
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
  {#each posts as post}
    <Post {...post} />
  {/each}
</main>
