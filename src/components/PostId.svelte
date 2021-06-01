<script>
  export let _id = "???";
</script>

<!-- //TODO easter egg for ??? -->

<a class="postId" on:click|preventDefault href={`/post/${_id}`}>
  #{_id}
</a>

<style>
  .postId {
    text-decoration: none;
    color: rgb(83, 83, 83);
  }
</style>
