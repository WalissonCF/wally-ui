export interface ComboboxInterface {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
  metadata?: Record<string, any>;
}

export interface ComboboxGroup {
  label: string;
  items: ComboboxInterface[];
}
