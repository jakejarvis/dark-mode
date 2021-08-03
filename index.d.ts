interface DarkModeOptions {
  toggle?: HTMLElement;
  classes?: { dark: string, light: string };
  default?: string;
  storageKey?: string;
}

export default function (options?: Partial<DarkModeOptions>): void;
