export function init(options?: {
  toggle?: HTMLElement;
  classes?: { dark: string, light: string };
  default?: string;
  storageKey?: string;
  onInit?: (toggle?: HTMLElement) => void;
  onChange?: (theme?: string, toggle?: HTMLElement) => void;
}): void;
