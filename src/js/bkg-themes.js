import { writable } from 'svelte/store';

export const bkgThemePrefStore = writable('scenic');

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

export const getScreenType = (value) => {
  if (value <= 380) {
    return 'mobile';
  } else if (value >= 380 && value <= 520) {
    return 'tablet';
  } else if (value >= 520) {
    return 'desktop';
  }
};

