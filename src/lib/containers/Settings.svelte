<script>
  import { slide, fade } from 'svelte/transition';
  import ToggleFormatBtn from '@components/ToggleFormatBtn.svelte';
  import BkgSelect from '@components/BkgSelect.svelte';

  export let isSettingsOpen;
  export let toggleSettings;
</script>

<button class="settings-btn" on:click={toggleSettings}>
  <img class="btn-icon" src="assets/icons/settings.svg" alt="Settings Menu" />
</button>

{#if isSettingsOpen}
  <section class="settings" transition:slide={{ duration: 375, delay: 0, axis: 'x' }}>
    <div class="flex" transition:fade={{ delay: 325, duration: 100 }}>
      <h2 class="menu-title">Settings</h2>
      <ToggleFormatBtn />
      <BkgSelect />
    </div>
  </section>
{/if}

<style>
  .btn-icon {
    max-height: 25px;
  }

  .settings-btn,
  .settings {
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
  }

  .settings {
    position: fixed;
    max-width: fit-content;
    height: 100vh;
    color: var(--stone);
    padding-block-start: var(--gap-xxl);
    padding-inline: var(--gap-md);
    background: #ffffff;
    background: radial-gradient(at center, #fffffd, #ababab);
  }

  .menu-title {
    font-size: 1.5rem;
  }
</style>
