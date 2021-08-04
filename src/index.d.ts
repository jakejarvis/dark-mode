export as namespace darkMode;

export interface DarkModeOptions {
  toggle?: HTMLElement;
  classes?: { dark: string, light: string };
  default?: string;
  storageKey?: string;
}

export function init(options?: Partial<DarkModeOptions>): void;
