<script>
  import { onMount } from 'svelte';
  import { windowSizeStore } from 'svelte-legos';
  import { setGeoInfo, setTimeInfo } from '@js/api-stores.js';
  import { resolveBkgStyle, bkgPrefStore, timeOfDayStore, bkgImgs, getScreenType } from '@js/theme.js';
  import { Quote, Clock, InfoPanel, SettingsMenu } from '@containers';

  let isSettingsMenuOpen = false;
  let isInfoPanelOpen = false;
  const toggleSettings = () => (isSettingsMenuOpen = !isSettingsMenuOpen);
  const toggleInfoPanel = () => (isInfoPanelOpen = !isInfoPanelOpen);

  const size = windowSizeStore();
  $: screenType = getScreenType($size.width);
  $: timeOfDay = $timeOfDayStore;
  $: bkgPref = $bkgPrefStore;

  // Determine app background
  $: bkgTheme = resolveBkgStyle(screenType, timeOfDay, bkgPref);

  onMount(async () => {
    setGeoInfo();
    setTimeInfo();
    // TODO: Local storage check?
  });
</script>

<div class="container" style={bkgTheme}>
  <SettingsMenu {isSettingsMenuOpen} {toggleSettings} />
  <Quote {isInfoPanelOpen} />
  <Clock {isInfoPanelOpen} />
  <InfoPanel {isInfoPanelOpen} {toggleInfoPanel} />
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
