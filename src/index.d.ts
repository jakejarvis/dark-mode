interface DarkModeOptions {
  toggle?: HTMLElement;
  classes?: { dark: string, light: string };
  default?: string;
  storageKey?: string;
}

export function init(options?: DarkModeOptions): void;
