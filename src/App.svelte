<script>
  import { onMount } from 'svelte';
  import { geoStore } from '@scripts/stores.js';
  import { userClockStore } from '@scripts/stores.js';
  import { timeStore } from '@scripts/stores.js';
  import { fetchGeo } from '@scripts/api-fetch.js';
  import { fetchTime } from '@scripts/api-fetch.js';

  import Quote from '@containers/Quote.svelte';
  import Clock from '@containers/Clock.svelte';
  import Drawer from '@containers/Drawer.svelte';

  // TODO: Move store logic to App?

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
    console.log($userClockStore);
  });
</script>

<div class="app-wrapper">
  <Quote />
  <Clock />
  <!-- <Drawer /> -->
</div>

<style>
  .app-wrapper {
    background-color: var(--black);
    color: var(--white);
    display: grid;
    grid-template-rows: 1fr auto;
    gap: var(--gap-md);
    height: 100vh;
    padding-block: var(--gap-xl);
    padding-inline: var(--gap-lg);
  }
</style>
