# 🌓 Dark Mode Switcheroo™

[![CI](https://github.com/jakejarvis/dark-mode.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jakejarvis/dark-mode.js/actions/workflows/ci.yml)
[![npm (scoped)](https://img.shields.io/npm/v/@jakejarvis/dark-mode)](https://www.npmjs.com/package/@jakejarvis/dark-mode)
[![MIT License](https://img.shields.io/github/license/jakejarvis/dark-mode?color=violet)](LICENSE)

Very simple CSS dark/light mode toggler with saved preference via local storage & dynamic OS setting detection. Zero dependencies and [only ~500 bytes gzipped!](https://bundlephobia.com/package/@jakejarvis/dark-mode)

- [View the example.](https://jakejarvis.github.io/dark-mode/)
- [Read the blog post.](https://jarv.is/notes/dark-mode/)
- [See it in action.](https://jarv.is/)

## Usage

### Options

`darkMode.init([...options])`

- **`toggle`**: The clickable [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) used to toggle between the two themes. (optional, default: `null`)
- **`classes`**: An object containing the `<body>` class names for the light and dark themes. (optional, default: `{ light: "light", dark: "dark" }`)
- **`default`**: The initial `<body>` class hard-coded into the HTML template. (optional, default: `"light"`)
- **`storageKey`**: Name of the `localStorage` key holding the user's preference. (optional, default: `"dark_mode_pref"`)
- **`onInit([toggle])`**: Callback function executed at the end of initialization. The toggle above is passed in if set. (optional, default: `null`)
- **`onChange([theme, toggle])`**: Callback function executed when theme is switched. The new theme and the toggle above (if set) are passed in. (optional, default: `null`)

### Browser

```html
<button class="dark-mode-toggle" style="visibility: hidden;">💡 Click to see the light... or not.</button>

<script src="https://unpkg.com/@jakejarvis/dark-mode/dist/dark-mode.min.js"></script>
<script>
  window.darkMode.init({
    toggle: document.querySelector(".dark-mode-toggle"),
    classes: {
      light: "light",
      dark: "dark",
    },
    default: "light",
    storageKey: "dark_mode_pref",
    onInit: function (toggle) {
      toggle.style.visibility = "visible"; // toggle appears now that we know JS is enabled
    },
    onChange: function (theme, toggle) {
      console.log("Theme is now " + theme);
    },
  });
</script>
```

### Node

```bash
npm install @jakejarvis/dark-mode
# or...
yarn add @jakejarvis/dark-mode
```

#### Module via `import`

```js
import { init } from "@jakejarvis/dark-mode";

init({
  // ...same as browser.
});
```

#### CommonJS via `require()`

```js
const darkMode = require("@jakejarvis/dark-mode");

darkMode.init({
  // ...same as browser.
});
```

## To-Do

- [ ] Support more than two themes
- [ ] Better readme docs
- [x] Add callback function `onChange` (or `onToggle` etc.) passed in as an option

## License

MIT
