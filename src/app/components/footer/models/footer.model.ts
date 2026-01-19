
export interface FooterButtonConfig {
  enabled?: boolean;
  route?: string;
}

export interface FooterConfig {
  home?: FooterButtonConfig;
  repeat?: FooterButtonConfig;
  gamepad?: FooterButtonConfig;
  volume?: FooterButtonConfig;
}
