<script>
  import { geoApiStore } from '@scripts/stores.js';
  import { clockStore } from '@scripts/stores.js';
  import Greeting from '@components/Greeting.svelte';
  import Drawer from '@containers/Drawer.svelte';
</script>

<main>
  <Greeting />

  <div class="clock">
    <h1 class="user-time">{$clockStore.currentTime}</h1>
    {#if $clockStore.currentPeriod}
      <div class="info-12hr">
        <h2 class="user-period">{$clockStore.currentPeriod}</h2>
        <p class="zone-code">{$geoApiStore.zoneCode}</p>
      </div>
    {:else}
      <h5 class="info-24hr">{$geoApiStore.zoneCode}</h5>
    {/if}
  </div>

  <h3 class="location">in {$geoApiStore.city}, {$geoApiStore.area}</h3>

  <!-- <Drawer /> -->
</main>

<style>
  .clock {
    display: flex;
    gap: var(--gap-sm);
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

  .user-time {
    letter-spacing: -3px;
  }

  .zone-code {
    font-size: 15px;
  }

  .location,
  .zone-code {
    line-height: 28px;
  }
</style>
