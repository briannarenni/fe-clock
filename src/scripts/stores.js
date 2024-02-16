import { writable } from 'svelte/store';

export const userClockStore = writable(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));

setInterval(() => {
  userClockStore.set(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
}, 1000);

export const quoteStore = writable({ quote: '', author: '' });

export const geoStore = writable({ city: '', area: '', zoneCode: '', zoneName: '' });

export const timeStore = writable({ abbr: '', dayOfWeek: 0, dayOfYear: 0, weekNumber: 0 });
