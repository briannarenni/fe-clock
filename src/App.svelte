<script>
  import { onMount } from 'svelte';
  import { fetchGeo } from '@scripts/apiServices.js';
  import { bkgImgs } from '@scripts/dayNightAssets.js';
  import { size, geoApiStore, worldApiStore, timeOfDayStore } from '@scripts/stores.js';
  import Quote from '@containers/Quote.svelte';
  import Clock from '@containers/Clock.svelte';

  const getScreenType = (value) => {
    if (value <= 380) {
      return 'mobile';
    } else if (value >= 380 && value <= 520) {
      return 'tablet';
    } else if (value >= 520) {
      return 'desktop';
    }
  };

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

  $: screenType = getScreenType($size.width);
  $: bkgImgUrl = bkgImgs[screenType][$timeOfDayStore];
  $: bkgStyle = `background-image: url(${bkgImgUrl}); background-size: cover; background-repeat: no-repeat; background-color: var(--black);`;

  onMount(async () => setGeo());
</script>

<div class="container" style={bkgStyle}>
  <Quote />
  <Clock />
</div>

<style>
  .container {
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    gap: var(--gap-md);
    color: var(--white);
    height: 100vh;
    padding-block: var(--gap-xl);
    padding-inline: var(--gap-lg);
  }
</style>
