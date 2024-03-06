import { writable } from 'svelte/store';
import { windowSizeStore } from 'svelte-legos';

const now = new Date();
const initLocale = new Intl.DateTimeFormat([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: undefined,
}).resolvedOptions().hourCycle.startsWith('h23') ? false : true;

export const format12HrStore = writable(initLocale);
export const size = windowSizeStore();

export const getTimeOfDay = () => {
  const hours = now.getHours();
  // * test evening hours
  // const hours = 19;

  if (hours >= 5 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else {
    return 'night';
  }
}

export const getUserTime = (bool) => {
  let timeString = now.toLocaleTimeString([],
    { hour: '2-digit', minute: '2-digit', hour12: bool });
  let currentTime;
  let currentPeriod;

  // Separate time & period for 12-hour format
  if (format12HrStore) {
    currentTime = timeString.slice(0, -3);
    currentPeriod = timeString.slice(-2);
  } else {
    currentTime = timeString;
    currentPeriod = '';
  }
  return { currentTime, currentPeriod };
}

export const quoteApiStore = writable({ quote: '', author: '' });

export const geoApiStore = writable({ city: '', area: '', zoneCode: '' });
export const worldApiStore = writable({ timezone: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });

export const clockStore = writable(getUserTime(format12HrStore));
setInterval(() => {
  clockStore.set(getUserTime(format12HrStore));
}, 60000);

export const timeOfDayStore = writable(getTimeOfDay());
setInterval(() => {
  timeOfDayStore.set(getTimeOfDay());
}, 60000);
