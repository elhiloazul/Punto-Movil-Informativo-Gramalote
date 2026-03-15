import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { InteractiveSlide } from '../../interactive-slide';
import { LoggerService } from '../../../../core/logger/logger.service';
import { Photo } from './models/Photo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-photo-capture-game',
  imports: [CommonModule],
  templateUrl: './slide-photo-capture-game.component.html',
  styleUrl: './slide-photo-capture-game.component.scss'
})
export class SlidePhotoCaptureGameComponent implements InteractiveSlide, OnInit, OnDestroy {
  @Output() completed = new EventEmitter<void>();
  @ViewChild('videoElement', { static: false }) videoElement?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement', { static: false }) canvasElement?: ElementRef<HTMLCanvasElement>;
  
  text: string = '';
  capturedPhotos: Photo[] = [];
  showAlbum: boolean = false;
  showCameraButton: boolean = false;
  showCameraInstruction: boolean = false;
  gamePhase: 'intro' | 'instruction' | 'playing' | 'album' = 'intro';
  cameraStream?: MediaStream;
  photosToCapture: number = 5;
  currentPhotoCount: number = 0;
  cameraError: string = '';

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    // Reiniciar el contador de fotos cada vez que se inicia el componente
    this.resetPhotoGame();
    this.initializeGame();
  }

  ngOnDestroy() {
    this.stopCamera();
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
    
    console.log('Juego de fotos reiniciado');
  }

  initializeGame() {
    this.gamePhase = 'intro';
    this.text = '¿Te doy un dato sobre mí? ¡Me encantan las fotos! Conservan recuerdos y nos permiten transmitir emociones a través de una imagen, compartirlo me parece algo muy especial, ¿me ayudarías? Vamos a capturar los momentos más especiales de lo que hacemos en Gramalote.';
    this.playAudio('audio/actividades/modulo-5/photo-capture/intro.mp3');
    
    setTimeout(() => {
      this.showCameraInstructionPhase();
    }, 5000);
  }

  showCameraInstructionPhase() {
    this.gamePhase = 'instruction';
    this.text = 'Cada que quieras tomar una foto, solo presiona esta cámara.';
    this.showCameraButton = true;
    this.showCameraInstruction = true;
    this.playAudio('audio/actividades/modulo-5/photo-capture/camera-instruction.mp3');
    
    setTimeout(() => {
      this.startPhotoSession();
    }, 3000);
  }

  async startPhotoSession() {
    this.gamePhase = 'playing';
    this.showCameraInstruction = false;
    this.text = `Después de que tomes las mejores ${this.photosToCapture} fotos, ¡Haremos juntos un álbum de fotos!`;
    this.playAudio('audio/actividades/modulo-5/photo-capture/album-instruction.mp3');
    
    await this.startCamera();
  }

  async startCamera() {
    try {
      // Verificar si getUserMedia está disponible
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia no está soportado en este navegador');
      }

      this.cameraStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Usar cámara trasera si está disponible
        },
        audio: false 
      });
      
      if (this.videoElement?.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.cameraStream;
        await this.videoElement.nativeElement.play();
      }
      
      this.cameraError = '';
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.cameraError = 'No se pudo acceder a la cámara. Por favor, permite el acceso a la cámara.';
      this.text = 'No se pudo acceder a la cámara. Por favor, permite el acceso a la cámara y recarga la página.';
    }
  }

  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = undefined;
    }
  }

  onCameraClick() {
    if (this.gamePhase !== 'playing' || this.currentPhotoCount >= this.photosToCapture) {
      return;
    }

    this.capturePhoto();
  }

  capturePhoto() {
    if (!this.videoElement?.nativeElement || !this.canvasElement?.nativeElement) {
      console.error('Video o canvas element no disponible');
      return;
    }

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    
    // Verificar que el video esté listo
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      console.error('Video no está listo para captura');
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
        captured: true
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
      console.error('Error capturando foto:', error);
      this.text = 'Error al capturar la foto. Inténtalo de nuevo.';
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
    this.stopCamera();
    this.text = '¡Excelente! Hemos creado un hermoso álbum con tus fotos capturadas. ¿Qué quieres hacer?';
    this.playAudio('audio/actividades/modulo-5/photo-capture/album-complete.mp3');
    
    // No emitir completed automáticamente, esperar acción del usuario
  }

  saveCapturedPhotos() {
    try {
      localStorage.setItem('gramalote-captured-photos', JSON.stringify(this.capturedPhotos));
    } catch (error) {
      console.error('Error saving photos to localStorage:', error);
    }
  }

  clearCapturedPhotos() {
    this.capturedPhotos = [];
    this.currentPhotoCount = 0;
    localStorage.removeItem('gramalote-captured-photos');
    
    // Después de limpiar, permitir continuar al siguiente slide
    this.text = 'Fotos eliminadas. ¡Gracias por jugar!';
    setTimeout(() => {
      this.completed.emit();
    }, 1500);
  }

  continueToNextSlide() {
    this.text = '¡Gracias por jugar!';
    // Las fotos se mantienen en localStorage hasta el próximo reinicio
    this.completed.emit();
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  generateId(): string {
    // Fallback para navegadores que no soportan crypto.randomUUID()
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Generar ID alternativo
    return 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  private playAudio(audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.log('Audio play failed:', error);
    });
  }
}