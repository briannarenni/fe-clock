import { writable, get } from 'svelte/store';
import { fetchQuoteData, fetchGeoData, fetchTimeData } from '@js/api-services.js';

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

  const clock = { currentTime: '', currentPeriod: '' };

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

export const quoteStore = writable({ quote: '', author: '' });
export const geoDataStore = writable({ city: '', area: '', zoneCode: '' });
export const timeDataStore = writable({ timezone: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });

// Populate quoteStore
export const updateQuote = async () => {
  const response = await fetchQuoteData();
  quoteStore.set({ quote: response.text, author: response.author });
};

// Populate geoDataStore
export const setGeoInfo = async () => {
  const response = await fetchGeoData();
  geoDataStore.set({
    city: response.city.name,
    area: response.area.name,
    zoneCode: response.time.code
  });
};

// Populate timeDataStore
export const setTimeInfo = async () => {
  const response = await fetchTimeData();
  timeDataStore.set({
    timezone: response.timezone,
    dayOfWeek: response.day_of_week,
    dayOfYear: response.day_of_year,
    weekNumber: response.week_number
  });
};
