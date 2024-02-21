<script>
  import { onMount } from 'svelte';
  import { fetchGeo } from '@scripts/apiServices.js';
  import { size, geoApiStore, worldApiStore, timeOfDayStore } from '@scripts/stores.js';
  // import { bkgImgs } from '@scripts/dayNightAssets.js';
  import Quote from '@containers/Quote.svelte';
  import Clock from '@containers/Clock.svelte';

  // TODO: getScreenType;

  const setTime = async (timezone) => {
    const response = await fetchTime(timezone);
    worldApiStore.js.set({
      abbr: response.abbreviation,
      dayOfWeek: response.day_of_week,
      dayOfYear: response.day_of_year,
      weekNumber: response.week_number
    });
  };

  export const setGeo = async () => {
    const response = await fetchGeo();
    geoApiStore.set({
      city: response.city.name,
      area: response.area.name,
      zoneCode: response.time.code,
      zoneName: response.time.timezone
    });
    const { timezone } = $geoApiStore;
    if (timezone) {
      setTime(timezone);
    }
  };

  onMount(async () => setGeo());
</script>

<div class="app-wrapper">
  <!-- TODO: Conditional background (set inline w variable) -->
  <Quote />
  <Clock />
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
