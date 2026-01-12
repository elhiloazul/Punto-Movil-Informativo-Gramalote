import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoSlide } from '../../models/slide.model';

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

  async ngOnInit() {
    await this.loadYouTubeApi();
    this.createPlayer();
  }

  private loadYouTubeApi(): Promise<void> {
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
    this.player = new window.YT.Player('youtube-player', {
      videoId: 'cR8T-S8zfNw',
      playerVars: {
        autoplay: 1,
        controls: 0,
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
    console.log('Player state changed:', event.data);
    if (event.data === window.YT.PlayerState.ENDED) {
      this.completed.emit();
    }
  }

}
