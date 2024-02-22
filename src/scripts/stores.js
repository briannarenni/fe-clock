import { writable } from 'svelte/store';
import { windowSizeStore } from 'svelte-legos';

export const size = windowSizeStore();

export const getTimeOfDay = () => {
  const now = new Date();
  const hours = now.getHours();
  // * test hours
  // const hours = 19;

  if (hours >= 5 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else {
    return 'night';
  }
}

export const formatTime = () => {
  const now = new Date();
  const hourCycle = new Intl.DateTimeFormat([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: undefined,
  }).resolvedOptions().hourCycle.startsWith('h23') ? false : true;

  let timeString = now.toLocaleTimeString([],
    { hour: '2-digit', minute: '2-digit', hour12: hourCycle });
  let currentTime;
  let currentPeriod = '';

  // Separate time & period for 12-hour format
  if (hourCycle) {
    currentTime = timeString.slice(0, -3);
    currentPeriod = timeString.slice(-2);
  } else {
    currentTime = timeString;
  }
  return { currentTime, currentPeriod };
}

export const quoteApiStore = writable({ quote: '', author: '' });
export const geoApiStore = writable({ city: '', area: '', zoneCode: '', zoneName: '' });
export const worldApiStore = writable({ abbr: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });

export const clockStore = writable(formatTime());
setInterval(() => {
  clockStore.set(formatTime());
}, 1000);

export const timeOfDayStore = writable(getTimeOfDay());
setInterval(() => {
  timeOfDayStore.set(getTimeOfDay());
}, 60000);



