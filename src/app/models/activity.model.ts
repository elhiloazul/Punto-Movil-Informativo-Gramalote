import { CustomSlide, DocumentSlide, ImageSlide, Slide, TextSlide, VideoSlide } from "./slide.model";

export type ActivitySlide = TextSlide | VideoSlide | ImageSlide | DocumentSlide | CustomSlide ;

export interface Activity {
    id: string;
    title: string;
    slides: ActivitySlide[];
}