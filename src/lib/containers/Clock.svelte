<script>
  import { onMount } from 'svelte';
  import { geoStore } from '@scripts/stores.js';
  import { userClockStore } from '@scripts/stores.js';
  import { timeStore } from '@scripts/stores.js';
  import { fetchGeo } from '@scripts/api-fetch.js';
  import { fetchTime } from '@scripts/api-fetch.js';
</script>

<main>
  <!-- <div></div> -->
  <!-- TODO: Greeting -->
  <div class="greeting">
    <!-- TODO: Conditional icon -->
    <!-- <img class="icon" src="" alt=""> -->

    <!-- TODO: Conditional greeting -->
    <h3 class="greeting no-bold">Good [greeting]</h3>

    <!-- TODO: Tablet/Desktop conditional greeting -->
    <!-- <p>Good [time of day], it's currently</p> -->
  </div>

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

  <!-- TODO: Conditional button -->
  <button class="expand-btn">More</button>
</main>

<style>
  .greeting {
    display: flex;
  }

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

  .greeting {
    line-height: 25px;
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

  .no-bold {
    font-weight: normal;
  }
</style>
