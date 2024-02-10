import { writable } from 'svelte/store';

export const quoteStore = writable({ quote: '', author: '' });

export const geoStore = writable({ city: '', area: '', zoneCode: '', timezone: '' });

// TODO: Update real-time...user Date instead of API?
export const timeStore = writable({ datetime: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });
