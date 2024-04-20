<script>
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { slide, fade } from 'svelte/transition';
  import FormatToggle from '@components/FormatToggle.svelte';
  import BkgSelect from '@components/BkgSelect.svelte';

  export let isSettingsMenuOpen;
  export let toggleSettings;

  const rotation = tweened(0, {
    duration: 400,
    easing: cubicInOut
  });

  $: if (isSettingsMenuOpen) {
    rotation.set(0);
  } else {
    rotation.set(150);
  }

  $: rotationStyle = `transform: rotate(${$rotation}deg);`;

  $: if ($rotation >= 360) {
    rotation.set(0, { duration: 0 });
  }
</script>

<button class="settings-btn" on:click={toggleSettings}>
  <img class="btn-icon" src="assets/icons/settings.svg" alt="Settings Menu" style={rotationStyle} />
</button>

{#if isSettingsMenuOpen}
  <section class="settings" transition:slide={{ duration: 300, delay: 0, axis: 'x' }}>
    <div class="flex" transition:fade={{ delay: 350, duration: 200 }}>
      <h2 class="menu-title">Settings</h2>
      <FormatToggle />
      <BkgSelect />
    </div>
  </section>
{/if}

<style>
  .btn-icon {
    max-height: 25px;
  }

  .menu-title {
    font-size: 1.8rem;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  .settings,
  .settings-btn {
    justify-self: end;
  }

  .settings-btn {
    max-width: fit-content;
    z-index: 1000;
    border-radius: 25px;
    padding: 5px;
    margin-block-start: 1rem;
    margin-inline-end: var(--gap-lg);
  }

  .settings-btn:hover {
    cursor: pointer;
    filter: invert(0.1);
  }

  .settings {
    position: fixed;
    height: 100vh;
    color: var(--stone);
    padding-block-start: calc(var(--gap-xl) + 0.75rem);
    padding-inline: var(--gap-md);
    background: #ffffff;
    background: linear-gradient(180deg, #e1e0e0 0%, #cdcccc 50%, #999696 100%);
  }

  @media screen and (min-width: 1200px) {
    .btn-icon {
      max-height: 30px;
    }
  }
</style>
