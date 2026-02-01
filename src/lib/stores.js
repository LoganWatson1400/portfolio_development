import { writable } from 'svelte/store';
export const terminalValue = writable('');
export const terminalHistory = writable([]);
