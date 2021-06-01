<script>
  export let date = new Date();
</script>

<span class="date">
  {new Date(date).toUTCString().split(",")[1].replace(" GMT", "")}
</span>
