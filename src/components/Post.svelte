<script>
  export let _id;
  export let body;
  export let date;
</script>

<div class="post">
  <div class="desc">
    <div>
      <a href="/#">#{_id}</a>
      {new Date(date).toUTCString().split(",")[1]}
    </div>
  </div>
  <div class="postBody">{body}</div>
</div>

<style>
  .post {
    margin: 0.1em 1em;
    flex-grow: 1;
    display: flex;
    background-color: #d8d8d8;
    padding: 1em;
    flex-direction: column;
    border: 0.1em solid #d1d1d1;
  }
  .postBody {
    font-size: 1.2em;
    min-height: 2em;
    overflow-wrap: break-word;
  }
  .desc {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.5em;
    opacity: 77%;
  }
</style>
