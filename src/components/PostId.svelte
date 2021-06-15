<script>
  export let _id = "???";
</script>

<!-- //TODO easter egg for ??? -->

<a class="postId" on:click|preventDefault href={`/post/${_id}`}>
  #{_id}
</a>

<style lang="scss">
  @import "../styles/colors";
  .postId {
    text-decoration: none;
    color: $idColor;
  }
</style>
