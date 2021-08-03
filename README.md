# 🌓 Dark mode switcheroo

Simple dark mode switching with saved preference via local storage & dynamic OS setting detection!

- [View the example.](https://jakejarvis.github.io/dark-mode-example/)
- [Read the blog post.](https://jarv.is/notes/dark-mode/)
- [See it in action.](https://jarv.is/)

## Usage

### `darkMode([...options])`

```js
import darkMode from "@jakejarvis/dark-mode";

darkMode({
  toggle: document.querySelector(".dark-mode-toggle"),
  classes: {
    light: "light",
    dark: "dark",
  },
  default: "light",
  storageKey: "dark_mode_pref",
});
```

#### Options

All optional.

- **toggle:** The clickable HTML element used to toggle between the two themes. (optional)
- **classes:** An object containing the `<body>` class names for the light and dark themes. (optional, default: `{ light: "light", dark: "dark" }`)
- **default:** The initial `<body>` class hard-coded into the HTML template. (optional, default: `light`)
- **storageKey:** Name of the `localStorage` key holding the user's preference. (optional, default: `dark_mode_pref`)

## License

MIT
