<script>
  import { onMount } from 'svelte';
  import { windowSizeStore } from 'svelte-legos';
  import { setGeoInfo, setTimeInfo } from '@js/stores.js';
  import { resolveBkgStyle, bkgPrefStore, timeOfDayStore, bkgImgs, getScreenType } from '@js/theming.js';
  import { Quote, Clock, Expand, Settings } from '@containers';

  let isSettingsOpen = false;
  let isExpandOpen = false;
  const toggleSettings = () => (isSettingsOpen = !isSettingsOpen);
  const toggleExpand = () => (isExpandOpen = !isExpandOpen);

  // Sets app bkg image dynamically
  const size = windowSizeStore();
  $: screenType = getScreenType($size.width);
  $: timeOfDay = $timeOfDayStore;
  $: bkgPref = $bkgPrefStore;


  $: bkgTheme = resolveBkgStyle(screenType, timeOfDay, bkgPref);



  onMount(async () => {
    setGeoInfo();
    setTimeInfo();
    // TODO: Local storage check?
  });
</script>

<div class="container" style={bkgTheme}>
  <Settings {isSettingsOpen} {toggleSettings} />
  <Quote {isExpandOpen} />
  <!-- ! Fix Clock overflow? -->
  <Clock {isExpandOpen} />
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
