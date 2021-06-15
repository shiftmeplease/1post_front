<script>
  export let country = "AQ";
  country = country.toLowerCase();
</script>

<img
  class="flag"
  src={`https://www.countryflags.io/${country}/flat/32.png`}
  alt={country}
/>

<style lang="scss">
  .flag {
    filter: saturate(50%);
    max-width: 100%;
    vertical-align: middle;
    // height: auto;
    // padding: 0;
    // margin: 0;
    // flex-grow: 0;
    width: 32px;
    height: 32px;
    transition: filter 0.1s ease-in-out;
  }
  .flag:hover {
    filter: saturate(100%);
  }
</style>
