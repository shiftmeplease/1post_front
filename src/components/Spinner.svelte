<!-- <script context="module" ✂prettier:content✂="CiAgbGV0IGVuYWJsZWQgPSB0cnVlOwogIGxldCBmYWRlID0gIiI7CgogIGFzeW5jIGZ1bmN0aW9uIHNwaW5uZXJGYWRlKGJvb2wpIHsKICAgIGlmIChmYWRlID09PSAiIikgewogICAgICBmYWRlID0gImluIjsKICAgIH0KICB9CiAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN3aXRjaFNwaW4oKSB7CiAgICBzcGlubmVyRmFkZSgpOwogIH0K" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script> -->
<script>
  import { Jumper } from "svelte-loading-spinners";
</script>

<!-- {#if enabled} -->
<div class="overlay">
  <Jumper size="5" color="#d8d8d8" unit="em" duration="1s" />
</div>

<!-- {/if} -->
<style>
  .overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 66%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* .fadeOut {
    visibility: hidden;
    opacity: 0%;
    transition: visibility 0s 2s, opacity 10s linear;
  }
  .fadeIn {
    visibility: visible;
    opacity: 66%;
    transition: visibility 0s 2s, opacity 2s linear;
  } */
</style>
