<script>
  import { onMount } from 'svelte';
  import { geoStore } from '@scripts/stores.js';
  import { userClockStore } from '@scripts/stores.js';
  import { timeStore } from '@scripts/stores.js';
  import { fetchGeo } from '@scripts/api-fetch.js';
  import { fetchTime } from '@scripts/api-fetch.js';

  async function getGeo() {
    const response = await fetchGeo();
    // city.name, area.name, time.code, time.timezone
    geoStore.set({
      city: response.city.name,
      area: response.area.name,
      zoneCode: response.time.code,
      zoneName: response.time.timezone
    });
    const { timezone } = $geoStore;
    if (timezone) {
      getTime(timezone);
    }
  }

  async function getTime(timezone) {
    const response = await fetchTime(timezone);
    // abbreviation, day_of_week, day_of_year, week_number
    timeStore.set({
      abbr: response.abbreviation,
      dayOfWeek: response.day_of_week,
      dayOfYear: response.day_of_year,
      weekNumber: response.week_number
    });
    console.log($timeStore);
  }

  onMount(async () => {
    getGeo();
  });
</script>

<main>
  <div class="greeting-wrap">
    <!-- TODO: Conditional icon -->
    <!-- <img class="icon" src="" alt=""> -->

    <!-- TODO: Conditional greeting -->
    <h3 class="greeting no-bold">Good [greeting]</h3>

    <!-- TODO: Tablet/Desktop conditional greeting -->
    <!-- <p>Good [time of day], it's currently</p> -->
  </div>

  <div class="time-wrap">
    <h1 class="time">{$userClockStore}</h1>
    <span class="zone-code">{$geoStore.zoneCode}</span>
  </div>
  <h3 class="location">in {$geoStore.city}, {$geoStore.area}</h3>
  <!-- TODO: Conditional button -->
  <button class="expand-btn">More</button>
</main>

<style>
  .greeting-wrap {
    display: flex;
  }

  .time-wrap {
    display: flex;
    align-items: baseline;
    gap: var(--gap-sm);
  }

  .greeting {
    line-height: 25px;
  }

  .time {
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
