# 🌓 Dark Mode Switcheroo™

[![CI](https://github.com/jakejarvis/dark-mode.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jakejarvis/dark-mode.js/actions/workflows/ci.yml)
[![npm (scoped)](https://img.shields.io/npm/v/@jakejarvis/dark-mode)](https://www.npmjs.com/package/@jakejarvis/dark-mode)
[![MIT License](https://img.shields.io/github/license/jakejarvis/dark-mode?color=violet)](LICENSE)

Very simple CSS dark/light mode toggler with saved preference via local storage & dynamic OS setting detection. Zero dependencies and only ~600 bytes gzipped!

- [View the example.](https://jakejarvis.github.io/dark-mode-example/)
- [Read the blog post.](https://jarv.is/notes/dark-mode/)
- [See it in action.](https://jarv.is/)

## Usage

### Options

`darkMode.init([...options])`

- **toggle:** The clickable HTML element used to toggle between the two themes. (optional, default: `null`)
- **classes:** An object containing the `<body>` class names for the light and dark themes. (optional, default: `{ light: "light", dark: "dark" }`)
- **default:** The initial `<body>` class hard-coded into the HTML template. (optional, default: `"light"`)
- **storageKey:** Name of the `localStorage` key holding the user's preference. (optional, default: `"dark_mode_pref"`)

### Browser

```html
<button class="dark-mode-toggle">💡 Click to see the light... or not.</button>

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
  toggle: document.querySelector(".dark-mode-toggle"),
  classes: {
    light: "light",
    dark: "dark",
  },
  default: "light",
  storageKey: "dark_mode_pref",
});
```

#### CommonJS via `require()`

```js
const darkMode = require("@jakejarvis/dark-mode");

darkMode.init({
  toggle: document.querySelector(".dark-mode-toggle"),
  classes: {
    light: "light",
    dark: "dark",
  },
  default: "light",
  storageKey: "dark_mode_pref",
});
```

## To-Do

- [ ] Support more than two themes
- [ ] Add callback function `onChange` (or `onToggle` etc.) passed in as an option
- [ ] Better readme docs

## License

MIT
