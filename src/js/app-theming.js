import { writable } from 'svelte/store';

// Stores current background theme
export const bkgThemePrefStore = writable('scenic');

// Determines current screen size
export const getScreenType = (value) => {
  if (value <= 380) {
    return 'mobile';
  } else if (value >= 380 && value <= 520) {
    return 'tablet';
  } else if (value >= 520) {
    return 'desktop';
  }
};

export const icons = {
  morning: 'assets/icons/sun-icon.svg',
  night: 'assets/icons/moon-icon.svg'
};

export const greetings = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  night: 'Good evening'
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



