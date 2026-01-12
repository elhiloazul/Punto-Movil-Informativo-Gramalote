import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoSlide } from '../../models/slide.model';
import { LoggerService } from '../../core/logger/logger.service';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  selector: 'app-slide-video-component',
  imports: [],
  templateUrl: './slide-video-component.component.html',
  styleUrl: './slide-video-component.component.scss'
})
export class SlideVideoComponentComponent {
  @Input({ required: true }) slide!: VideoSlide;
  @Output() completed = new EventEmitter<void>();

  private player!: any;
  protected audio?: HTMLAudioElement;
  constructor(private logger: LoggerService) { }
  
  ngOnInit() {
    if (this.slide.audio) {
      this.playAudio();
    }
  }

  async ngAfterViewInit() {
    await this.loadYouTubeApi();
  }

  private playAudio() {
    this.logger.debug("Playing audio for slide ", this.slide.id);

    this.audio = new Audio(this.slide.audio);
    this.audio.currentTime = 0;
    this.audio.play()
    this.audio.onended = () => {
        this.logger.debug("Audio ended for slide ", this.slide.id);
        this.createPlayer()
      };
  }

  private stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.src = '';
      this.audio = undefined;
    }
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  private loadYouTubeApi(): Promise<void> {
    this.logger.debug("Loading YouTube API...");
    return new Promise(resolve => {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => resolve();
    });
  }

  private createPlayer() {
    this.logger.debug("Creating YouTube player for slide ", this.slide);
    this.player = new window.YT.Player('youtube-player', {
      width: '100%',
      height: '100%',
      videoId: this.slide.videoUrl.split('v=')[1],
      playerVars: {
        autoplay: 1,
        controls: environment.youtubeControls,
        rel: 0,
        modestbranding: 1,
        fs: 0,
        iv_load_policy: 3
      },
      events: {
        onStateChange: (event: any) => this.onPlayerStateChange(event)
      }
    });
  }

  private onPlayerStateChange(event: any) {
    if (event.data === window.YT.PlayerState.ENDED) {
      this.completed.emit();
    }
  }

}
