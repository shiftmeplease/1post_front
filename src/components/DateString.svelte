<script context="module">
  const offsetMs = new Date().getTimezoneOffset() * 60000;
</script>

<script>
  export let date;
  $: date = new Date(Date.parse(date) - offsetMs);
</script>

<span class="date">
  {date.toUTCString().split(",")[1].replace(" GMT", "")}
</span>
