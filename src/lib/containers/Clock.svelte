<script>
  import { onMount } from 'svelte';
  import { geoStore } from '@scripts/stores.js';
  import { userClockStore } from '@scripts/stores.js';
  import { timeStore } from '@scripts/stores.js';
  import { fetchGeo } from '@scripts/api-fetch.js';
  import { fetchTime } from '@scripts/api-fetch.js';
</script>

<main>
  <div class="greeting">
    <!-- TODO: Conditional icon -->
    <!-- <img class="icon" src="" alt=""> -->

    <!-- TODO: Conditional greeting -->
    <h3 class="greeting no-bold">Good [greeting]</h3>

    <!-- TODO: Tablet/Desktop conditional greeting -->
    <!-- <p>Good [time of day], it's currently</p> -->
  </div>

  <div class="clock">
    <h1 class="user-time">{$userClockStore}</h1>
    <span class="zone-code">{$geoStore.zoneCode}</span>
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
    align-items: baseline;
    gap: var(--gap-sm);
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
