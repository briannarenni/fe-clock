import { derived } from 'svelte/store';
import { userClockStore } from '@scripts/clockStores.js';

// TODO: Derive time of day
export const timeOfDayStore = derived(userClockStore, ($userClockStore) => {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) {
    return 'Morning';
  } else if (hours >= 12 && hours < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
});
