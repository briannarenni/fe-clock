import { writable, get } from 'svelte/store';

export const quoteApiStore = writable({ quote: '', author: '' });
export const geoApiStore = writable({ city: '', area: '', zoneCode: '' });
export const worldApiStore = writable({ timezone: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });

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

const initTimeFormat = new Intl.DateTimeFormat([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: undefined,
}).resolvedOptions().hourCycle.startsWith('h23') ? false : true;

export const use12HrFormatStore = writable(initTimeFormat);

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

export const clockStore = writable(getUserTime(get(use12HrFormatStore)));
setInterval(() => {
  clockStore.set(getUserTime(get(use12HrFormatStore)));
}, 60000);
