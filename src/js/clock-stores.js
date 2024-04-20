import { writable, get } from 'svelte/store';

// Determines user's local time format on app init
const initTimeFormat = new Intl.DateTimeFormat([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: undefined,
}).resolvedOptions().hourCycle.startsWith('h23') ? false : true;

// Check local storage for time format preference
const checkStoredFormat = () => {
  let formatPref = localStorage.getItem('formatPref');
  if (formatPref === null) {
    localStorage.setItem('formatPref', initTimeFormat);
    return initTimeFormat;
  }
  return formatPref === 'true' ? true : false;
}

// Stores user-chosen format pref/updates local storage
export const use12HrFormatStore = writable(checkStoredFormat());
use12HrFormatStore.subscribe((value) => localStorage.setItem('formatPref', value));

// Gets and formats current time based on pref
export const getUserTime = (use12Format) => {
  const clock = { currentTime: '', currentPeriod: '' };

  let timeString = new Date().toLocaleTimeString([],
    { hour: '2-digit', minute: '2-digit', hour12: use12Format });

  if (use12Format) {
    clock.currentTime = timeString.slice(0, -3);
    clock.currentPeriod = timeString.slice(-2);
  } else {
    clock.currentTime = timeString;
    clock.currentPeriod = '';
  }
  return clock;
}

// Stores current time (updates every minute)
export const clockStore = writable(getUserTime(get(use12HrFormatStore)));
setInterval(() => {
  clockStore.set(getUserTime(get(use12HrFormatStore)));
}, 60000);

