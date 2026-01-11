
export type SlideType = 'text' | 'video' | 'image' | 'document';

export interface Slide {
    id: string;
    type: SlideType;
    audio?: string;
}

export interface TextSlide extends Slide {
    type: 'text';
    text: string;
}

export interface VideoSlide extends Slide {
    type: 'video';
    videoUrl: string;
    text?: string
}

export interface ImageSlide extends Slide {
    type: 'image';
    imageUrl: string;
    text?: string
}

export interface DocumentSlide extends Slide {
    type: 'document';
    documentUrl: string;
}