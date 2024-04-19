import { writable } from 'svelte/store';

// Stores selected background theme
export const bkgPrefStore = writable('scenic');

// Determines time of day for dynamic app theming
export const getTimeOfDay = () => {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else {
    return 'night';
  }
}

// Refreshes time of day every minute
export const timeOfDayStore = writable(getTimeOfDay());
setInterval(() => {
  timeOfDayStore.set(getTimeOfDay());
}, 60000);

// Determines current screen size reactively
export const getScreenType = (value) => {
  if (value <= 380) {
    return 'mobile';
  } else if (value >= 380 && value <= 520) {
    return 'tablet';
  } else if (value >= 520) {
    return 'desktop';
  }
};

export const bkgImgs = {
  mobile: {
    morning: 'assets/bkg-imgs/mobile-day.jpg',
    afternoon: 'assets/bkg-imgs/mobile-day.jpg',
    night: 'assets/bkg-imgs/mobile-night.jpg'
  },
  tablet: {
    morning: 'assets/bkg-imgs/tablet-day.jpg',
    afternoon: 'assets/bkg-imgs/tablet-day.jpg',
    night: 'assets/bkg-imgs/tablet-night.jpg'
  },
  desktop: {
    morning: 'assets/bkg-imgs/desktop-day.jpg',
    afternoon: 'assets/bkg-imgs/desktop-day.jpg',
    night: 'assets/bkg-imgs/desktop-night.jpg'
  }
};




