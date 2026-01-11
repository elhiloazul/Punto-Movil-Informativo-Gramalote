import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  private isListeningSubject = new BehaviorSubject<boolean>(false);
  isListening$ = this.isListeningSubject.asObservable();

  private errorSubject = new BehaviorSubject<string>("");
  error$ = this.errorSubject.asObservable();

  recognition: any;  

  constructor(private zone: NgZone) { 
    this.initRecognition();
  }

  private initRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-CO';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      // eventos básicos
      this.recognition.onstart = () => this.isListeningSubject.next(true);
      this.recognition.onend = () => this.isListeningSubject.next(false);

      this.recognition.onerror = (event: any) => {
        console.error("❌ Error en SpeechRecognition:", event.error);
        this.errorSubject.next(event.error);
        this.isListeningSubject.next(false);
      };

    } else {
      console.error("❌ SpeechRecognition no soportado en este navegador.");
    }
  }

  startListening(callback: (text: string) => void) {
    if (!this.recognition) return;

    if (this.isListeningSubject.value) {
      console.warn("⚠️ Ya está escuchando, se ignora start()");
      return;
    }

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.zone.run(() => {
        callback(transcript);
      });
    };

    this.recognition.start();
  }

  stopListening() {
    if (this.recognition && this.isListeningSubject.value) {
      this.recognition.stop();
    }
  }

  speak(text: string, callback?: () => void) {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-419";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      console.log("✅ Terminó de hablar");
      if (callback) callback();
    };

    speechSynthesis.speak(utterance);
  }
}
