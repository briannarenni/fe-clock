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
      timezone: response.time.timezone
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
  <h3 class="no-bold">Good [time of day]</h3>
  <!-- Tablet/Desktop -->
  <!-- <p>Good [time of day], it's currently</p> -->
  <h1>{$userClockStore}</h1>
  <h3>in {$geoStore.city}, {$geoStore.area}</h3>
  <button>More</button>
  <button>Less</button>
</main>

<style>
  .no-bold {
    font-weight: normal;
  }
</style>
