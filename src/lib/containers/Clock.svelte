<script>
  import { onMount } from 'svelte';
  import { geoStore } from '@scripts/clockStores.js';
  import { userClockStore } from '@scripts/clockStores.js';
  import Greeting from '@components/Greeting.svelte';
  import Drawer from '@containers/Drawer.svelte';
</script>

<main>
  <Greeting />

  <div class="clock">
    <h1 class="user-time">{$userClockStore.currentTime}</h1>
    {#if $userClockStore.currentPeriod}
      <div class="info-12hr">
        <h2 class="user-period">{$userClockStore.currentPeriod}</h2>
        <p class="zone-code">{$geoStore.zoneCode}</p>
      </div>
    {:else}
      <h5 class="info-24hr">{$geoStore.zoneCode}</h5>
    {/if}
  </div>

  <h3 class="location">in {$geoStore.city}, {$geoStore.area}</h3>

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
