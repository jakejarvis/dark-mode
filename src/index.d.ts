export function init(options?: {
  toggle?: Element | null;
  classes?: { dark: string, light: string };
  default?: string;
  storageKey?: string;
  onInit?: (toggle?: Element | null) => unknown;
  onChange?: (theme?: string, toggle?: Element | null) => unknown;
}): void;
