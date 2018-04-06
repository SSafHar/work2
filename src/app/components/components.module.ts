import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesModule } from '../services/services.module';
import { BgImageDirective } from './bg-image/bg-image.directive';
import { BiographyComponent } from './biography/biography.component';
import { ComponentsMaterialModule } from './components-material.module';
import { ContactComponent } from './contact/contact.component';
import { EventItemComponent } from './event-item/event-item.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { MapComponent } from './map/map.component';
import { MasterClassComponent } from './master-class/master-class.component';
import { MediaComponent } from './media/media.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageSliderFragmentDirective } from './page-slider/page-slider-fragment.directive';
import { PageSliderParentDirective } from './page-slider/page-slider-parent.directive';
import { PageSliderComponent } from './page-slider/page-slider.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
import { VideoItemComponent } from './video-item/video-item.component';
import { VideoListComponent } from './video-list/video-list.component';

export const exportedItems = [
  HomeComponent,
  ImageSliderComponent,
  PageSliderComponent,
  PageSliderParentDirective,
  PageSliderFragmentDirective,
  NavbarComponent,
  BgImageDirective,
  MediaComponent,
  VideoListComponent,
  VideoItemComponent,
  VideoDialogComponent,
  MasterClassComponent,
  EventsComponent,
  FooterComponent,
  EventItemComponent,
  MapComponent,
  BiographyComponent,
  ContactComponent
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsMaterialModule,
    RouterModule,
    ServicesModule
  ],
  declarations: exportedItems,
  exports: exportedItems,
  entryComponents: [
    VideoDialogComponent
  ]
})
export class ComponentsModule {}
