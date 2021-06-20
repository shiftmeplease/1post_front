<!-- hydratable -->
<script>
  import Header from "../components/Header.svelte";
  import "../styles/app.scss";
  // import Spinner from "../components/Spinner.svelte";
  import Notifications from "svelte-notifications";
</script>

<!-- TODO auto close notifications, better positioning -->
<!-- <Spinner /> -->
<Notifications>
  <Header />
  <slot />
  <div>footer</div>
</Notifications>
