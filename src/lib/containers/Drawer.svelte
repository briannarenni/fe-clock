<script>
  import { size, worldApiStore } from '@scripts/stores.js';
  import { slide } from 'svelte/transition';

  export let isDrawerOpen;
  export let toggleDrawer;

  const formatTimezone = (str) => str.replace(/_/g, ' ');

  $: currTimeZone = formatTimezone($worldApiStore.timeZone);
  $: dayOfWeek = $worldApiStore.dayOfWeek;
  $: dayOfYear = $worldApiStore.dayOfYear;
  $: weekNumber = $worldApiStore.weekNumber;

  $: btnText = isDrawerOpen ? 'Less' : 'More';
  $: iconSrc = isDrawerOpen ? 'src/assets/icons/arrow-up.svg' : 'src/assets/icons/arrow-down.svg';
</script>

<button class="expand-btn" on:click={toggleDrawer}>
  <p class="btn-text">{btnText}</p>
  <img class="btn-icon" src={iconSrc} alt="Expand/Collapse" />
</button>

{#if isDrawerOpen}
  <section class="overlay gradient">
    <div class="info-drawer" transition:slide={{ duration: 600, delay: 0 }}>
      <section class="info-group">
        <!-- * Trims text on mobile screens -->
        {#if $size.width <= 399}
          <h6 class="title">Timezone</h6>
        {:else if $size.width >= 400}
          <h6 class="title">Current timezone</h6>
        {/if}
        <h2 class="info">{currTimeZone}</h2>
      </section>

      <section class="info-group">
        <h6 class="title">Day of Year</h6>
        <h2>{dayOfYear}</h2>
      </section>

      <section class="info-group">
        <h6 class="title">Day of Week</h6>
        <h2>{dayOfWeek}</h2>
      </section>

      <section class="info-group">
        <h6 class="title">Week Number</h6>
        <h2>{weekNumber}</h2>
      </section>
    </div>
  </section>
{/if}

<style>
  .expand-btn {
    max-width: fit-content;
    display: inline-flex;
    align-items: center;
    border-radius: 25px;
    margin: var(--gap-lg);
    margin-block-end: var(--gap-xxl);
    padding: 5px;
    letter-spacing: 3.75px;
  }

  .btn-text {
    margin-inline: var(--space-sm);
  }

  .btn-icon {
    width: 32px;
  }
  .info-drawer {
    display: flex;
    flex-direction: column;
    gap: var(--gap-sm);
    width: 100%;
    position: relative;
    color: var(--stone);
    padding-block: var(--gap-xxl);
    padding-inline: var(--gap-md);
  }

  .info-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
  }

  .title {
    font-weight: normal;
    margin-block: 0;
  }

  /* Bkg overlay styles */
  .overlay {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gradient {
    width: 100%;
    height: 100%;
    background: #fffffd;
    background: radial-gradient(at center, #fffffd, #ababab);
  }

  @media screen and (min-width: 768px) {
    .expand-btn {
      letter-spacing: 5px;
    }
  }
</style>
