import { writable } from 'svelte/store';

const now = new Date();

export const getTimeOfDay = () => {
  const hours = now.getHours();

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

export const getUserTime = (bool) => {
  let timeString = now.toLocaleTimeString([],
    { hour: '2-digit', minute: '2-digit', hour12: bool });
  let currentTime, currentPeriod = '';

  if (bool) {
    currentTime = timeString.slice(0, -3);
    currentPeriod = timeString.slice(-2);
  } else {
    currentTime = timeString;
  }
  return { currentTime, currentPeriod };
}

const initLocale = new Intl.DateTimeFormat([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: undefined,
}).resolvedOptions().hourCycle.startsWith('h23') ? false : true;

export const formatBoolStore = writable(initLocale);

export const clockStore = writable(getUserTime(formatBoolStore));
setInterval(() => {
  clockStore.set(getUserTime(formatBoolStore));
}, 60000);

export const quoteApiStore = writable({ quote: '', author: '' });
export const geoApiStore = writable({ city: '', area: '', zoneCode: '' });
export const worldApiStore = writable({ timezone: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });
