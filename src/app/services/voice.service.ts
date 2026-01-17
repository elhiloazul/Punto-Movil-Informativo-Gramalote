import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoiceService {

  private recognition!: any;
  private lastCallback?: (text: string) => void;
  private isManualStop = false;
  private shouldRestart = false;

  private isListeningSubject = new BehaviorSubject<boolean>(false);
  isListening$ = this.isListeningSubject.asObservable();

  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initRecognition();
  }

  initRecognition() {
    if (!isPlatformBrowser(this.platformId)) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition no soportado');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-ES';
    this.recognition.continuous = true; // ✅ Cambiar a true
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    /* =========================
       EVENTOS CLAVE
    ========================== */

    this.recognition.onstart = () => {
      console.log('🎤 Reconocimiento iniciado');
      this.zone.run(() => {
        this.isListeningSubject.next(true);
        this.isManualStop = false;
      });
    };

    this.recognition.onend = () => {
      console.log('🛑 Reconocimiento terminado', {
        isManualStop: this.isManualStop,
        shouldRestart: this.shouldRestart
      });
      
      this.zone.run(() => {
        // Solo reiniciar si no fue detenido manualmente y debería continuar
        if (!this.isManualStop && this.shouldRestart) {
          console.log('🔄 Reiniciando reconocimiento...');
          setTimeout(() => {
            try {
              this.recognition.start();
            } catch (e) {
              console.warn('Error al reiniciar:', e);
            }
          }, 100);
        } else {
          this.isListeningSubject.next(false);
          this.shouldRestart = false;
        }
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('❌ Error de reconocimiento:', event.error);
      
      this.zone.run(() => {
        // Solo manejar errores críticos
        if (event.error === 'no-speech') {
          this.errorSubject.next('no-speech');
        } else if (event.error === 'audio-capture') {
          this.errorSubject.next('audio-capture');
          this.isListeningSubject.next(false);
          this.shouldRestart = false;
        } else if (event.error === 'not-allowed') {
          this.errorSubject.next('not-allowed');
          this.isListeningSubject.next(false);
          this.shouldRestart = false;
        }
        // Ignorar errores como 'aborted' que ocurren durante paradas normales
      });
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log('🗣️ Transcripción:', transcript);

      this.zone.run(() => {
        if (this.lastCallback && transcript.trim()) {
          this.lastCallback(transcript);
        }
      });
    };

    // Evento adicional útil para debug
    this.recognition.onspeechstart = () => {
      console.log('🎙️ Voz detectada');
    };

    this.recognition.onspeechend = () => {
      console.log('🔇 Voz terminada');
    };
  }

  /* =========================
     CONTROL
  ========================== */

  startListening(callback: (text: string) => void) {
    console.log('▶️ Iniciando escucha...');
    
    if (!this.recognition) {
      console.error('Recognition no inicializado');
      return;
    }

    this.lastCallback = callback;
    this.isManualStop = false;
    this.shouldRestart = true;

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('El reconocimiento ya estaba activo, reiniciando...', e);
      // Si ya estaba activo, detenerlo y reiniciarlo
      this.recognition.stop();
      setTimeout(() => {
        try {
          this.recognition.start();
        } catch (err) {
          console.error('Error al reiniciar:', err);
        }
      }, 100);
    }
  }

  stopListening() {
    console.log('⏹️ Deteniendo escucha...');
    
    if (!this.recognition) return;

    this.isManualStop = true;
    this.shouldRestart = false;

    try {
      this.recognition.stop();
    } catch (e) {
      console.warn('Error al detener:', e);
    }
  }

  // Método adicional para verificar permisos
  async checkMicrophonePermission(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) return false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Error de permisos de micrófono:', error);
      return false;
    }
  }
}