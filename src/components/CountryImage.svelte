<script>
  export let country = "AQ";
  country = country.toLowerCase();
</script>

<img
  class="flag"
  src={`https://www.countryflags.io/${country}/flat/32.png`}
  alt={country}
/>

<style>
  .flag {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    padding: 0;
    margin: 0;
    flex-grow: 0;
    width: 32px;
    height: 32px;
  }
</style>
