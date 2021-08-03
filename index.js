/*! Dark mode switcheroo | MIT License | jrvs.io/darkmode */

export default function (options) {
  // { toggle, classes: { light, dark }, default, storageKey }
  options = options || {};

  console.log(options);

  // use a specified element(s) to trigger swap when clicked
  const toggle = options.toggle || null;

  console.log(toggle);

  // check for preset `dark_mode_pref` preference in local storage
  const storageKey = options.storageKey || "dark_mode_pref";
  const pref = localStorage.getItem(storageKey);

  // change CSS via these <body> classes:
  let dark = "dark";
  let light = "light";
  if (options.classes) {
    dark = options.classes.dark;
    light = options.classes.light;
  }

  // which class is <body> set to initially?
  const defaultTheme = options.default || "light";

  // keep track of current state no matter how we got there
  let active = defaultTheme === dark;

  // receives a class name and switches <body> to it
  const activateTheme = function (theme) {
    document.body.classList.remove(dark, light);
    document.body.classList.add(theme);
    active = theme === dark;
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
    window
      .matchMedia(prefers("dark"))
      .addEventListener("change", function (e) {
        if (e.matches) {
          activateTheme(dark);
        }
      });
    window
      .matchMedia(prefers("light"))
      .addEventListener("change", function (e) {
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
    // toggle re-appears now that we know user has JS enabled
    toggle.style.display = "block";

    // handle toggle click
    toggle.addEventListener("click", function () {
      // switch to the opposite theme & save preference in local storage
      if (active) {
        activateTheme(light);
        localStorage.setItem(storageKey, light);
      } else {
        activateTheme(dark);
        localStorage.setItem(storageKey, dark);
      }
    });
  }
}
