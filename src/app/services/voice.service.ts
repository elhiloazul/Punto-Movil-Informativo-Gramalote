import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  private isListening = new BehaviorSubject<boolean>(false);
  isListening$ = this.isListening.asObservable();

  private errorSubject = new BehaviorSubject<string>("");
  error$ = this.errorSubject.asObservable();

  
  recognition: any;  

  constructor(private zone: NgZone) { 
    this.listen();
  }

  listen() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-CO';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    } else {
      console.error("❌ SpeechRecognition no soportado en este navegador.");
    }

  }

  startListening(callback: (text: string) => void) {
    if (!this.recognition) return;

    this.isListeningFuction(true);
    this.recognition.start();

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.zone.run(() => {
        callback(transcript);
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error("Error en SpeechRecognition:", event.error);
      this.errorSubject.next(event.error);
    };

    this.recognition.onend = () => {
      this.isListeningFuction(false);
    };
  }

  stopListening() {
    if (this.recognition) {
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
      if (callback) {
        callback();
      }
    };

    speechSynthesis.speak(utterance);
  }

  isListeningFuction(nuevoValor: boolean) {
    this.isListening.next(nuevoValor);
  }
  
}
