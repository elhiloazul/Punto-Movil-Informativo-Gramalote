export interface MenuActivityConfig {
  audio?: string;
  popoverDescription?: string;
}

export interface MenuActivity {
  id: string;
  name: string;
  menuOrder: number;
  menuConfig: MenuActivityConfig;
}
