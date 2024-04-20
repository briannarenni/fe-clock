<script>
  import { SkeletonText } from 'skeleton-elements/svelte';
  import { clockStore, geoDataStore } from '@js/stores.js';
  import Greeting from '@components/Greeting.svelte';

  export let isInfoPanelOpen;

  $: time = $clockStore.currentTime;
  $: period = $clockStore.currentPeriod;
  $: zoneCode = $geoDataStore.zoneCode;
  $: city = $geoDataStore.city;
  $: area = $geoDataStore.area;
</script>

<main class="clock-container">
  <Greeting />

  <div class="clock">
    <!-- Shrink font size if InfoPanel is open -->
    <h1 class="time" style="font-size: {isInfoPanelOpen ? 'calc(var(--time-font) - 1rem)' : ''};">{time}</h1>
    {#if period}
      <div class="info-12hr">
        {#if !period}
          <SkeletonText effect="wave">{period}</SkeletonText>
        {:else}
          <h2 class="period">{period}</h2>
        {/if}
        {#if !zoneCode}
          <SkeletonText effect="wave">XXX</SkeletonText>
        {:else}
          <h2 class="zonecode">{zoneCode}</h2>
        {/if}
      </div>
    {:else if !zoneCode}
      <SkeletonText effect="wave">XXX</SkeletonText>
    {:else}
      <h2 class="info-24hr zonecode">{zoneCode}</h2>
    {/if}
  </div>
  {#if !city || !area}
    <SkeletonText effect="wave">Lorem, ipsum dolor</SkeletonText>
  {:else}
    <!-- Shrink btm margin if InfoPanel is open -->
    <h4 class="location" style="margin-block-end: {isInfoPanelOpen ? '0' : ''};">in {city}, {area}</h4>
  {/if}
</main>

<style>
  .clock-container {
    padding: var(--gap-lg);
    padding-block-end: 0;
  }

  .clock {
    display: flex;
    gap: var(--gap-sm);
    line-height: 1.3;
  }

  .time {
    letter-spacing: -3px;
    font-size: var(--time-font);
  }

  .location {
    margin-block-end: var(--gap-lg);
  }

  .zonecode {
    font-weight: normal;
  }

  .zonecode,
  .period {
    font-size: var(--zone-font);
  }

  .location,
  .zonecode {
    line-height: 28px;
  }

  /* Alignment based on selected format*/
  .info-12hr {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .info-24hr {
    align-self: center;
    font-weight: normal;
  }

  @media screen and (min-width: 1024px) {
    .clock-container {
      padding-block-start: var(--gap-sm);
      padding-inline: var(--gap-lg);
    }
  }
</style>
