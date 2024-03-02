<script>
  import { SkeletonText } from 'skeleton-elements/svelte';
  import { clockStore, geoApiStore } from '@scripts/stores.js';
  import Greeting from '@components/Greeting.svelte';

  $: time = $clockStore.currentTime;
  $: period = $clockStore.currentPeriod;
  $: zoneCode = $geoApiStore.zoneCode;
  $: city = $geoApiStore.city;
  $: area = $geoApiStore.area;
</script>

<main>
  <Greeting />

  <div class="clock">
    <h1 class="time">{time}</h1>
    {#if $clockStore.currentPeriod}
      <div class="info-12hr">
        {#if !period}
          <SkeletonText effect="wave">PM</SkeletonText>
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
    <h4 class="location">in {city}, {area}</h4>
  {/if}
</main>

<style>
  main {
    padding-block-start: var(--gap-lg);
    padding-inline: var(--gap-lg);
  }

  .clock {
    display: flex;
    gap: var(--gap-sm);
    line-height: 1.3;
  }

  .location {
    margin-block-end: var(--gap-lg);
  }

  /* 12-hour time alignment */
  .info-12hr {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  /* 24-hour time alignment */
  .info-24hr {
    align-self: center;
    font-weight: normal;
  }

  .time {
    letter-spacing: -3px;
    font-size: var(--time-font);
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

  @media screen and (min-width: 1024px) {
    main {
      padding-block-start: var(--gap-sm);
      padding-inline: var(--gap-lg);
    }
  }
</style>
