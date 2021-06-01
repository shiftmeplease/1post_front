<script context="module">
  import { host } from "../../appConfig.js";

  export async function load({ page, fetch, session, context }) {
    const url = `${host}/api/post/id/${page.params.slug}`;
    const fetchRes = await fetch(url);
    const { success, post: postInfo } = await fetchRes.json();

    if (success) {
      return {
        props: {
          postInfo,
        },
      };
    }

    return {
      status: fetchRes.status,
      error: new Error(`Не могу загрузить ${url}`),
    };
  }
</script>

<script>
  import Post from "../../components/Post.svelte";
  // import { goto } from "$app/navigation";

  export let postInfo;
</script>

<svelte:head>
  <title>Post #{postInfo._id}</title>
</svelte:head>
<!-- TODO full preview -->
<div>
  <div class="overlay">
    <Post {postInfo} />
  </div>
</div>

<style>
  .overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 999;
    width: 100%;
    height: 100%;
    /* background-color: #000000; */
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
