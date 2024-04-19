import { writable, get } from 'svelte/store';

// Stores will be populated by API responses
export const quoteApiStore = writable({ quote: '', author: '' });
export const geoApiStore = writable({ city: '', area: '', zoneCode: '' });
export const worldApiStore = writable({ timezone: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });

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

// Refreshes time of day
export const timeOfDayStore = writable(getTimeOfDay());
setInterval(() => {
  timeOfDayStore.set(getTimeOfDay());
}, 60000);

// Determines user's local time format on app init
const initTimeFormat = new Intl.DateTimeFormat([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: undefined,
}).resolvedOptions().hourCycle.startsWith('h23') ? false : true;

// Allows user to choose time format pref
export const use12HrFormatStore = writable(initTimeFormat);

// Gets and formats user's current time based on pref
export const getUserTime = (use12Format) => {
  let timeString = new Date().toLocaleTimeString([],
    { hour: '2-digit', minute: '2-digit', hour12: use12Format });

  const clock = {
    currentTime: '',
    currentPeriod: ''
  };

  if (use12Format) {
    clock.currentTime = timeString.slice(0, -3);
    clock.currentPeriod = timeString.slice(-2);
  } else {
    clock.currentTime = timeString;
    clock.currentPeriod = '';
  }
  return clock;
}

// Stores current time information (and updates every minute)
export const clockStore = writable(getUserTime(get(use12HrFormatStore)));
setInterval(() => {
  clockStore.set(getUserTime(get(use12HrFormatStore)));
}, 60000);
