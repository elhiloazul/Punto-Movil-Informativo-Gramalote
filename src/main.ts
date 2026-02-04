import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Interceptar Audio globalmente antes de que se inicialice la aplicación
if (typeof window !== 'undefined') {
  const originalAudio = (window as any).Audio;
  // Recuperar volumen guardado o usar 1 por defecto
  let globalVolume = parseFloat(localStorage.getItem('appVolume') || '1');
  const audioElements: HTMLAudioElement[] = [];

  (window as any).Audio = function(src?: string) {
    const audio = new originalAudio(src);
    audioElements.push(audio);
    
    // Aplicar volumen usando defineProperty correctamente
    const originalVolumeSetter = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'volume')?.set;
    if (originalVolumeSetter) {
      originalVolumeSetter.call(audio, globalVolume);
    } else {
      audio.volume = globalVolume;
    }
    
    // Interceptar el método play para asegurar que el volumen se aplique antes de reproducir
    const originalPlay = audio.play;
    audio.play = function() {
      // Reaplicar volumen justo antes de reproducir
      if (originalVolumeSetter) {
        originalVolumeSetter.call(this, globalVolume);
      } else {
        this.volume = globalVolume;
      }
      return originalPlay.call(this);
    };
    
    return audio;
  };
  
  // Función global para controlar volumen
  (window as any).setGlobalVolume = (volume: number) => {
    globalVolume = volume;
    // Guardar en localStorage para persistir entre recargas
    localStorage.setItem('appVolume', volume.toString());
    audioElements.forEach(audio => {
      try {
        audio.volume = volume;
      } catch (e) {}
    });
  };
  
  // Función para obtener el volumen actual
  (window as any).getGlobalVolume = () => {
    return globalVolume;
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync() // ⬅️ Cambiado a Async
  ]
}).catch(err => console.error(err));