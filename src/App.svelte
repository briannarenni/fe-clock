<script>
  import { onMount } from 'svelte';
  import { fetchGeo, fetchTime } from '@scripts/apiServices.js';
  import { size, geoApiStore, worldApiStore, timeOfDayStore } from '@scripts/stores.js';
  import { bkgImgs } from '@scripts/dayNightAssets.js';
    import ToggleBtn from '@components/ToggleBtn.svelte';

  import Quote from '@containers/Quote.svelte';
  import Clock from '@containers/Clock.svelte';
  import Drawer from '@containers/Drawer.svelte';

  const getScreenType = (value) => {
    if (value <= 380) {
      return 'mobile';
    } else if (value >= 380 && value <= 520) {
      return 'tablet';
    } else if (value >= 520) {
      return 'desktop';
    }
  };

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

  let isDrawerOpen = false;
  const toggleDrawer = () => (isDrawerOpen = !isDrawerOpen);

  $: screenType = getScreenType($size.width);
  $: bkgImgUrl = bkgImgs[screenType][$timeOfDayStore];
  $: bkgStyle = `background-image: url(${bkgImgUrl}); background-size: cover; background-repeat: no-repeat; background-color: var(--black);`;

  onMount(async () => {
    setGeo();
    setTime();
  });
</script>

<div class="container" style={bkgStyle}>
    <ToggleBtn />
  <Quote {isDrawerOpen} />

  <Clock />

  <Drawer {isDrawerOpen} {toggleDrawer} />
</div>

<style>
  .container {
    display: grid;
    grid-template-rows: auto 1fr 1fr auto;
    color: var(--white);
    height: 100vh;
  }
</style>
