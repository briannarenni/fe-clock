<script>
  import Quote from '@containers/Quote.svelte';
  import Greeting from '@containers/Greeting.svelte';
  import Drawer from '@containers/Drawer.svelte';
</script>

<div class="app-wrapper">
  <Quote />
  <Greeting />
  <!-- <Drawer /> -->
</div>

<style>
  .app-wrapper {
    background-color: var(--black);
    color: var(--white);
    display: grid;
    grid-template-rows: 1fr auto;
    gap: var(--gap-md);
    height: 100vh;
    padding-block: var(--gap-xl);
    padding-inline: var(--gap-lg);
  }
</style>
