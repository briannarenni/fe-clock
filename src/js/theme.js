import { writable } from 'svelte/store';

// Check local storage for background theme preference
const checkBkgPref = () => {
  let bkgPref = localStorage.getItem('bkgPref');
  if (bkgPref === null) {
    localStorage.setItem('bkgPref', 'scenic');
    return 'scenic';
  }
  return bkgPref;
}

// Stores selected background theme/updates local storage
export const bkgPrefStore = writable(checkBkgPref());
bkgPrefStore.subscribe((value) => localStorage.setItem('bkgPref', value));

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

// Sets app background selection
export const resolveBkgStyle = (screenType, timeOfDay, bkgPref) => {
  // Set bkg image dynamically
  const bkgImgUrl = bkgImgs[screenType][timeOfDay];

  switch (bkgPref) {
    case 'scenic':
      return `background-image: url(${bkgImgUrl}); background-size: cover; background-repeat: no-repeat; background-color: var(--dark-bkg)`;
    case 'glacier':
      return 'background: var(--glacier-bkg);';
    case 'meadow':
      return 'background: var(--meadow-bkg);';
    case 'grape':
      return 'background: var(--grape-bkg);';
    case 'bubblegum':
      return 'background: var(--bubblegum-bkg);';
    case 'tropical':
      return 'background: var(--tropical-bkg);';
    case 'lilac':
      return 'background: var(--lilac-bkg);';
    case 'gunmetal':
      return 'background: var(--gunmetal-bkg);';
    case 'midnight':
      return 'background: var(--midnight-bkg);';
    default:
      return `background-image: url(${bkgImgUrl}); background-size: cover; background-repeat: no-repeat; background-color: var(--black);`;
  }
}
