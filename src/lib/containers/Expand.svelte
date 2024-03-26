<script>
  import { slide } from 'svelte/transition';
  import { windowSizeStore } from 'svelte-legos';
  import { worldApiStore } from '@js/data-stores.js';

  export let isExpandOpen;
  export let toggleExpand;
  const size = windowSizeStore();

  const formatTimezone = (str) => str.replace(/_/g, ' ');

  $: currTimeZone = formatTimezone($worldApiStore.timezone);
  $: dayOfWeek = $worldApiStore.dayOfWeek;
  $: dayOfYear = $worldApiStore.dayOfYear;
  $: weekNumber = $worldApiStore.weekNumber;

  $: btnText = isExpandOpen ? 'Less' : 'More';
  $: iconSrc = isExpandOpen ? 'assets/icons/arrow-up.svg' : 'assets/icons/arrow-down.svg';
</script>

<button class="expand-btn" on:click={toggleExpand}>
  <p class="btn-text">{btnText}</p>
  <img class="btn-icon" src={iconSrc} alt="Show/hide more info" />
</button>

{#if isExpandOpen}
  <section class="expand-info" transition:slide={{ duration: 650, delay: 0 }}>
    <section class="info-group">
      <!-- * Trims text on mobile screens -->
      {#if $size.width <= 399}
        <h6 class="category">Timezone</h6>
      {:else if $size.width >= 400}
        <h6 class="category">Current timezone</h6>
      {/if}
      <h2 class="info">{currTimeZone}</h2>
    </section>

    <section class="info-group">
      <h6 class="category">Day of Year</h6>
      <h2 class="info">{dayOfYear}</h2>
    </section>

    <section class="info-group">
      <h6 class="category">Day of Week</h6>
      <h2 class="info">{dayOfWeek}</h2>
    </section>

    <section class="info-group">
      <h6 class="category">Week Number</h6>
      <h2 class="info">{weekNumber}</h2>
    </section>
  </section>
{/if}

<style>
  .expand-btn {
    max-width: fit-content;
    max-height: 45px;
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

  .expand-info {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--gap-sm);
    color: var(--stone);
    padding-block: var(--gap-md);
    padding-inline: var(--gap-md);
    background: #fffffd;
    background: radial-gradient(at center, #fffffd, #ababab);
  }

  .info-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
  }

  .category {
    font-weight: normal;
    font-size: var(--title-font);
    margin-block: 0;
  }

  .info {
    font-size: var(--info-font);
  }

  .expand-btn:hover {
    cursor: pointer;
  }

  .btn-icon:hover {
    filter: grayscale(100%) brightness(95%) contrast(60%);
  }

  /* QUERIES */
  @media screen and (min-width: 650px) {
    .expand-btn {
      letter-spacing: 5px;
    }

    .expand-info {
      grid-template-columns: auto auto;
      gap: var(--gap-lg);
      padding-inline: var(--gap-xxl);
    }

    .info-group {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media screen and (min-width: 1024px) {
    .expand-info {
      gap: var(--gap-sm);
      padding-block: var(--gap-sm);
    }
  }

  @media screen and (min-width: 1200px) {
    .expand-btn {
      letter-spacing: 3px;
      margin-block-end: var(--gap-lg);
    }
  }
</style>
