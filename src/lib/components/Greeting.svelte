<script>
  import { windowSizeStore } from 'svelte-legos';
  import { timeOfDayStore } from '@js/data-stores.js';

  let iconSrc;
  let greeting;

  const size = windowSizeStore();

  const icons = {
    morning: 'assets/icons/sun-icon.svg',
    night: 'assets/icons/moon-icon.svg'
  };

  const greetings = {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    night: 'Good evening'
  };

  if ($timeOfDayStore === 'morning') {
    iconSrc = icons.morning;
    greeting = greetings.morning;
  } else if ($timeOfDayStore === 'afternoon') {
    iconSrc = icons.morning;
    greeting = greetings.afternoon;
  } else if ($timeOfDayStore === 'night') {
    iconSrc = icons.night;
    greeting = greetings.night;
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
