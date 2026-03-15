export interface Photo {
  id: string;
  name: string;
  imageData: string; // Base64 data URL de la foto capturada
  timestamp: number;
  captured: boolean;
}