import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BannerService } from './banner.service';
import { EventService } from './event.service';
import { ImageService } from './image.service';
import { MainInterceptorService } from './main-interceptor.service';
import { VideoService } from './video.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/data/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptorService,
      multi: true
    },
    VideoService,
    EventService,
    BannerService,
    ImageService
  ],
  exports: [
    TranslateModule
  ]
})
export class ServicesModule {}
