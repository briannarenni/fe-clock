<script>
  import { onMount } from 'svelte';
  import { windowSizeStore } from 'svelte-legos';
  import { bkgImgs, getScreenType } from '@js/app-theme.js';
  import { fetchGeo, fetchTime } from '@js/api-services.js';
  import { geoApiStore, worldApiStore, timeOfDayStore } from '@js/data-stores.js';

  import Quote from '@containers/Quote.svelte';
  import Clock from '@containers/Clock.svelte';
  import Expand from '@containers/Expand.svelte';
  import Settings from '@containers/Settings.svelte';

  const setTime = async () => {
    const response = await fetchTime();
    worldApiStore.set({
      timezone: response.timezone,
      dayOfWeek: response.day_of_week,
      dayOfYear: response.day_of_year,
      weekNumber: response.week_number
    });
  };

  const setGeo = async () => {
    const response = await fetchGeo();
    geoApiStore.set({
      city: response.city.name,
      area: response.area.name,
      zoneCode: response.time.code
    });
  };

  let isExpandOpen = false;
  const toggleExpand = () => (isExpandOpen = !isExpandOpen);

  let isSettingsOpen = false;
  const toggleSettings = () => (isSettingsOpen = !isSettingsOpen);

  const size = windowSizeStore();
  $: screenType = getScreenType($size.width);
  $: bkgImgUrl = bkgImgs[screenType][$timeOfDayStore];
  $: bkgStyle = `background-image: url(${bkgImgUrl}); background-size: cover; background-repeat: no-repeat; background-color: var(--black);`;

  onMount(async () => {
    setGeo();
    setTime();
  });
</script>

<!-- ? then import bkgStyle to use here -->
<div class="container" style={bkgStyle}>
  <Settings {isSettingsOpen} {toggleSettings} />

  <Quote {isExpandOpen} />

  <Clock />

  <Expand {isExpandOpen} {toggleExpand} />
</div>

<style>
  .container {
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr 1fr auto;
    color: var(--white);
    position: relative;
  }
</style>
