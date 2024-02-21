import { derived } from 'svelte/store';
import { userClockStore } from '@scripts/clockStores.js';

export const icons =
{
  day: '/src/assets/icons/sun-icon.svg',
  night: '/src/assets/icons/moon-icon.svg'
}

const greetings = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  evening: 'Good evening'
}

export const bkgImgs = {
  mobile: {
    day: '/src/assets/bkg-imgs/mobile-day.jpg',
    night: '/src/assets/bkg-imgs/mobile-night.jpg'
  },
  tablet: {
    day: '/src/assets/bkg-imgs/tablet-day.jpg',
    night: '/src/assets/bkg-imgs/tablet-night.jpg'
  },
  desktop: {
    day: '/src/assets/bkg-imgs/desktop-day.jpg',
    night: '/src/assets/bkg-imgs/desktop-night.jpg'
  }
};



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
