import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { InteractiveSlide } from '../../interactive-slide';
import { LoggerService } from '../../../../core/logger/logger.service';
import { Photo } from './models/Photo';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  selector: 'app-slide-photo-capture-game',
  imports: [CommonModule],
  templateUrl: './slide-photo-capture-game.component.html',
  styleUrl: './slide-photo-capture-game.component.scss',
})
export class SlidePhotoCaptureGameComponent
  implements InteractiveSlide, OnInit, OnDestroy, AfterViewInit
{
  @Output() completed = new EventEmitter<void>();
  @ViewChild('videoElement', { static: false })
  videoElement?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement', { static: false })
  canvasElement?: ElementRef<HTMLCanvasElement>;

  private videoUrl = 'images/video-prueba.mp4'; 

  text: string = '';
  capturedPhotos: Photo[] = [];
  showAlbum: boolean = false;
  showCameraButton: boolean = false;
  showCameraInstruction: boolean = false;
  gamePhase: 'intro' | 'instruction' | 'playing' | 'album' = 'intro';
  photosToCapture: number = 6;
  currentPhotoCount: number = 0;
  cameraError: string = '';
  private currentAudio?: HTMLAudioElement;
  isVideoReady: boolean = false;
  isFadingOut: boolean = false;

  constructor(private logger: LoggerService) {}

  ngOnInit() {
    // Reiniciar el contador de fotos cada vez que se inicia el componente
    this.resetPhotoGame();
  }

  async ngAfterViewInit() {
    // Esperar un tick para asegurar que el template esté completamente renderizado
    // El videoElement se cargará desde startPhotoSession
  }

  private async startVideoPlayback() {
    try {
      if (this.videoUrl?.includes('youtube.com') || this.videoUrl?.includes('youtu.be')) {
        this.cameraError = 'Los videos de YouTube no soportan captura de pantallazos. Use videos locales en formato MP4.';
        return;
      }
      
      // Cargar video local
      if (this.videoElement?.nativeElement) {
        const video = this.videoElement.nativeElement;
        video.src = this.videoUrl || '';
        
        this.logger.debug('Intentando cargar video:', this.videoUrl);
        
        // Esperar a que el video esté listo
        video.onloadedmetadata = () => {
          this.logger.debug('Video cargado exitosamente');
          this.isVideoReady = true;
          // Intentar reproducir
          video.play().catch(err => {
            this.logger.error('Error al reproducir video:', err);
            this.cameraError = `No se pudo reproducir el video: ${err.message}`;
          });
        };
        
        video.onerror = (error) => {
          this.logger.error('Error cargando video:', error);
          this.cameraError = `Error al cargar el video. Verifica que el archivo exista en: public/images/video-prueba.mp4`;
        };
      }
    } catch (error) {
      this.logger.error('Error en startVideoPlayback:', error);
      this.cameraError = `Error inesperado: ${error}`;
    }
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  resetPhotoGame() {
    // Reiniciar todas las variables del juego
    this.currentPhotoCount = 0;
    this.capturedPhotos = [];
    this.showAlbum = false;
    this.showCameraButton = false;
    this.showCameraInstruction = false;
    this.gamePhase = 'intro';
    this.cameraError = '';

    // Limpiar localStorage para empezar fresco
    localStorage.removeItem('gramalote-captured-photos');

    this.startPhotoSession();
  }

  async startPhotoSession() {
    // Reproducir segundo audio con segundo texto
    this.text =
      'después de que tomes los mejores 6 fotos, ¡Haremos juntos un álbum!';
    this.gamePhase = 'playing';
    this.showCameraButton = true;

    // Reproducir audio primero
    await this.playAudio(
      'audio/actividades/modulo-5/photo-capture/slide-2.mp3',
    );

    // Después de que el audio termine, cargar y reproducir el video
    setTimeout(async () => {
      await this.startVideoPlayback();
    }, 100);
  }

  // Métodos de video cargados dinámicamente (no usados actualmente)
  private loadYouTubeApi(): Promise<void> {
    return Promise.resolve();
  }

  private createPlayer() {
    // Video element está en el HTML template
  }

  private extractVideoId(url: string): string {
    return '';
  }

  onCameraClick() {
    if (
      this.gamePhase !== 'playing' ||
      this.currentPhotoCount >= this.photosToCapture
    ) {
      return;
    }

    this.capturePhoto();
  }

  capturePhoto() {
    if (
      !this.videoElement?.nativeElement ||
      !this.canvasElement?.nativeElement
    ) {
      console.error('Video o canvas element no disponible');
      return;
    }

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;

    // Verificar que el video esté reproduciéndose
    if (video.paused || video.ended) {
      console.error('Video no está reproduciéndose');
      this.text = 'Por favor, asegúrate de que el video esté reproduciéndose.';
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      console.error('No se pudo obtener contexto 2D del canvas');
      return;
    }

    try {
      // Configurar el canvas con las dimensiones del video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      // Dibujar el frame actual del video en el canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convertir a base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8);

      // Crear objeto Photo
      const photo: Photo = {
        id: this.generateId(),
        name: `Foto ${this.currentPhotoCount + 1}`,
        imageData: imageData,
        timestamp: Date.now(),
        captured: true,
      };

      this.capturedPhotos.push(photo);
      this.currentPhotoCount++;

      // Guardar en localStorage
      this.saveCapturedPhotos();

      // Mostrar efecto de captura
      this.showCaptureEffect();

      // Actualizar texto
      this.text = `¡Excelente! Foto ${this.currentPhotoCount} de ${this.photosToCapture} capturada.`;

      // Si ya se capturaron todas las fotos, mostrar álbum
      if (this.currentPhotoCount >= this.photosToCapture) {
        setTimeout(() => {
          this.showPhotoAlbum();
        }, 1500);
      }
    } catch (error) {
      console.error('Error capturando pantalla:', error);
      this.text = 'Error al capturar la pantalla. Inténtalo de nuevo.';
    }
  }

  showCaptureEffect() {
    // Efecto visual de captura de foto
    const flashEffect = document.createElement('div');
    flashEffect.className = 'camera-flash';
    document.body.appendChild(flashEffect);

    setTimeout(() => {
      if (document.body.contains(flashEffect)) {
        document.body.removeChild(flashEffect);
      }
    }, 300);
  }

  showPhotoAlbum() {
    this.gamePhase = 'album';
    this.showAlbum = true;
    this.showCameraButton = false;
    this.text =
      '¡Excelente! Hemos creado un hermoso álbum con tus fotos capturadas. ¿Qué quieres hacer?';

    // No emitir completed automáticamente, esperar acción del usuario
  }

  saveCapturedPhotos() {
    try {
      localStorage.setItem(
        'gramalote-captured-photos',
        JSON.stringify(this.capturedPhotos),
      );
    } catch (error) {
      console.error('Error saving photos to localStorage:', error);
    }
  }

  continueToNextSlide() {
    // Activar la animación de desvanecimiento
    this.isFadingOut = true;
    
    // Esperar a que la animación de fade out termine (600ms)
    setTimeout(() => {
      this.completed.emit();
      this.capturedPhotos = [];
      this.currentPhotoCount = 0;
      localStorage.removeItem('gramalote-captured-photos');
    }, 600);
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  generateId(): string {
    // Fallback para navegadores que no soportan crypto.randomUUID()
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Generar ID alternativo
    return (
      'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    );
  }

  private async playAudio(audioPath: string): Promise<void> {
    return new Promise((resolve) => {
      this.stopAudio();
      console.log('Intentando reproducir:', audioPath);
      this.currentAudio = new Audio(audioPath);
      this.currentAudio.onended = () => {
        console.log('Audio terminado:', audioPath);
        resolve();
      };
      this.currentAudio.onerror = (error) => {
        console.error('Error reproduciendo audio:', audioPath, error);
        resolve();
      };
      this.currentAudio.play().catch((error) => {
        console.error('Error al iniciar audio:', audioPath, error);
        resolve();
      });
    });
  }

  private stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = undefined;
    }
  }
}
