// Import TypeScript modules
import { registerSettings } from './module/Settings.js';
import { MODULE_NAME } from './module/Settings.js';
import { MODULE_TITLE } from './module/Settings.js';
import { initHooks, readyHooks, setupHooks } from './module/Hooks.js';

export let debugEnabled = 0;
// 0 = none, warnings = 1, debug = 2, all = 3

export let debug = (...args) => {
  if (debugEnabled > 1) console.log(`DEBUG:${MODULE_NAME} | `, ...args);
};
export let log = (...args) => console.log(`${MODULE_NAME} | `, ...args);
export let warn = (...args) => {
  if (debugEnabled > 0) console.warn(`${MODULE_NAME} | `, ...args);
};
export let error = (...args) => console.error(`${MODULE_NAME} | `, ...args);
export let timelog = (...args) => warn(`${MODULE_NAME} | `, Date.now(), ...args);
export let setDebugLevel = (debugText) => {
  debugEnabled = { none: 0, warn: 1, debug: 2, all: 3 }[debugText] || 0;
  // 0 = none, warnings = 1, debug = 2, all = 3
  if (debugEnabled >= 3) CONFIG.debug.hooks = true;
};

/* ------------------------------------ */
/* Initialize module                    */
/* ------------------------------------ */

Hooks.once('init', async () => {
  console.log(`  
  ${MODULE_NAME} | Initializing ${MODULE_TITLE}
  `);
  registerSettings();
  initHooks();
});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
  setupHooks();
  registerSettings();
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', () => {
  readyHooks();
});
