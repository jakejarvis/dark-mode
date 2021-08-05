"use strict";

const init = function (options) {
  options = options || {};

  // use a specified element(s) to trigger swap when clicked
  const toggle = options.toggle || null;

  // check for preset `dark_mode_pref` preference in local storage
  const storageKey = options.storageKey || "dark_mode_pref";
  const storageAvailable = isStorageAvailable();
  const pref = storageAvailable ? localStorage.getItem(storageKey) : null;

  // change CSS via these <body> classes:
  const dark = options.classes ? options.classes.dark : "dark";
  const light = options.classes ? options.classes.light : "light";

  // which class is <body> set to initially?
  const defaultTheme = options.default || "light";

  // keep track of current state no matter how we got there
  let active = defaultTheme === dark;

  // receives a class name and switches <body> to it
  const activateTheme = function (theme, remember) {
    document.body.classList.remove(dark, light);
    document.body.classList.add(theme);
    active = theme === dark;

    if (storageAvailable && !!remember) {
      localStorage.setItem(storageKey, theme);
    }

    // optional onChange callback function passed as option
    if (typeof options.onChange === "function") {
      options.onChange(theme, toggle);
    }
  };

  // user has never clicked the button, so go by their OS preference until/if they do so
  if (!pref) {
    // returns media query selector syntax
    const prefers = function (colorScheme) {
      // https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme
      return `(prefers-color-scheme: ${colorScheme})`;
    };

    // check for OS dark/light mode preference and switch accordingly
    // default to `defaultTheme` set above if unsupported
    if (window.matchMedia(prefers("dark")).matches) {
      activateTheme(dark);
    } else if (window.matchMedia(prefers("light")).matches) {
      activateTheme(light);
    } else {
      activateTheme(defaultTheme);
    }

    // real-time switching if supported by OS/browser
    window.matchMedia(prefers("dark")).addEventListener("change", function (e) {
      if (e.matches) {
        activateTheme(dark);
      }
    });
    window.matchMedia(prefers("light")).addEventListener("change", function (e) {
      if (e.matches) {
        activateTheme(light);
      }
    });
  } else if (pref === dark || pref === light) {
    // if user already explicitly toggled in the past, restore their preference
    activateTheme(pref);
  } else {
    // fallback to default theme (this shouldn't happen)
    activateTheme(defaultTheme);
  }

  // don't freak out if page happens not to have a toggle
  if (toggle !== null) {
    // handle toggle click
    toggle.addEventListener("click", function () {
      // switch to the opposite theme & save preference in local storage
      if (active) {
        activateTheme(light, true);
      } else {
        activateTheme(dark, true);
      }
    });
  }

  // optional onInit callback function passed as option
  if (typeof options.onInit === "function") {
    options.onInit(toggle);
  }
};

// recommended method (by MDN) to detect localStorage availability:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
const isStorageAvailable = function () {
  try {
    var storage = window["localStorage"];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

export { init };
