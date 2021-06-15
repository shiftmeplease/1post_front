<script context="module">
  const offsetMsStore = new Date().getTimezoneOffset() * 60000;
</script>

<script>
  export let date;
  // kinda ignore of reactivesvelte(module-script-reactive-declaration)
  //TODO move to store
  const offsetMs = offsetMsStore;
  $: date = new Date(Date.parse(date) - offsetMs);
</script>

<span>
  {date.toUTCString().split(",")[1].replace(" GMT", "")}
</span>
