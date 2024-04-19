<script>
  import { onMount } from 'svelte';
  import { windowSizeStore } from 'svelte-legos';
  import { setGeoInfo, setTimeInfo } from '@js/stores.js';
  import { bkgPrefStore, timeOfDayStore, bkgImgs, getScreenType } from '@js/theming.js';
  import { Quote, Clock, Expand, Settings } from '@containers';

  let isSettingsOpen = false;
  let isExpandOpen = false;
  const toggleSettings = () => (isSettingsOpen = !isSettingsOpen);
  const toggleExpand = () => (isExpandOpen = !isExpandOpen);

  // Sets app background image dynamically
  const size = windowSizeStore();
  $: screenType = getScreenType($size.width);
  $: appBkgImg = bkgImgs[screenType][$timeOfDayStore];

  // TODO: Refactor and clean up for scaling
  $: bkgTheme =
    $bkgPrefStore === 'scenic'
      ? `background-image: url(${bkgImgs[screenType][$timeOfDayStore]}); background-size: cover; background-repeat: no-repeat; background-color: var(--black);`
      : $bkgPrefStore === 'dark'
        ? 'background: var(--dark-bkg);'
        : 'background: var(--light-bkg);';

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
