import { writable} from 'svelte/store';

function formatTime () {
  const now = new Date();
  // const testLocale = 'de-DE';
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

export const quoteStore = writable({ quote: '', author: '' });
export const geoStore = writable({ city: '', area: '', zoneCode: '', zoneName: '' });
export const timeStore = writable({ abbr: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });

export const userClockStore = writable(formatTime());
setInterval(() => {
  userClockStore.set(formatTime());
}, 1000);
