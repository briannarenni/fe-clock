<script>
  import { windowSizeStore } from 'svelte-legos';
  import { timeOfDayStore } from '@js/theme.js';

  let greeting, iconSrc;
  const size = windowSizeStore();

  if ($timeOfDayStore === 'morning') {
    greeting = 'Good morning';
    iconSrc = 'assets/icons/sun-icon.svg';
  } else if ($timeOfDayStore === 'afternoon') {
    greeting = 'Good afternoon';
    iconSrc = 'assets/icons/sun-icon.svg';
  } else if ($timeOfDayStore === 'night') {
    greeting = 'Good evening';
    iconSrc = 'assets/icons/moon-icon.svg';
  }
</script>

<section class="greeting-wrap">
  <div class="icon-wrap">
    <img class="icon" src={iconSrc} alt="morning/night icon" />
  </div>

  {#if $size.width <= 450}
    <h3 class="greeting">{greeting}</h3>
  {:else if $size.width >= 451}
    <h3 class="greeting">{greeting}, it's currently</h3>
  {/if}
</section>

<style>
  .greeting-wrap {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
  }

  .greeting {
    font-weight: normal;
    font-size: var(--greeting-font);
  }

  .icon {
    max-width: 24px;
  }
</style>
