<script>
  import { onMount } from 'svelte';
  import { windowSizeStore } from 'svelte-legos';
  import { bkgThemePrefStore, bkgImgs, getScreenType } from '@js/bkg-themes.js';
  import { fetchGeo, fetchTime } from '@js/api-services.js';
  import { geoApiStore, worldApiStore, timeOfDayStore } from '@js/data-stores.js';

  import Quote from '@containers/Quote.svelte';
  import Clock from '@containers/Clock.svelte';
  import Expand from '@containers/Expand.svelte';
  import Settings from '@containers/Settings.svelte';

  // Sets timezone info
  const setTime = async () => {
    const response = await fetchTime();
    worldApiStore.set({
      timezone: response.timezone,
      dayOfWeek: response.day_of_week,
      dayOfYear: response.day_of_year,
      weekNumber: response.week_number
    });
  };

  // Sets geolocation info
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

  // Sets app background image
  const size = windowSizeStore();
  $: screenType = getScreenType($size.width);
  $: appBkgImg = bkgImgs[screenType][$timeOfDayStore];

  $: bkgTheme =
    $bkgThemePrefStore === 'scenic'
      ? `background-image: url(${bkgImgs[screenType][$timeOfDayStore]}); background-size: cover; background-repeat: no-repeat; background-color: var(--black);`
      : $bkgThemePrefStore === 'dark'
        ? 'background: var(--dark-bkg);'
        : 'background: var(--light-bkg);';

  onMount(async () => {
    setGeo();
    setTime();
    // TODO: Local storage check?
  });
</script>

<div class="container" style={bkgTheme}>
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
