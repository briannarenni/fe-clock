import { writable } from 'svelte/store';
import { fetchQuoteData, fetchGeoData, fetchTimeData } from '@js/fetch.js';

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
