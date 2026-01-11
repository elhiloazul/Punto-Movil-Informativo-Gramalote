import { DocumentSlide, ImageSlide, Slide, TextSlide, VideoSlide } from "./slide.model";

export type ActivitySlide = TextSlide | VideoSlide | ImageSlide | DocumentSlide;

export interface Activity {
    id: string;
    title: string;
    slides: ActivitySlide[];
}