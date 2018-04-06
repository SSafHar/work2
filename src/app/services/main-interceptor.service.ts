import { APP_BASE_HREF } from '@angular/common';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';

@Injectable()
export class MainInterceptorService implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId, @Optional() @Inject(APP_BASE_HREF) private origin) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const {origin} = this;

    const changes = {
      url: origin ? `${origin}/${this.clearSlash(req.url)}` : req.url
    };

    return next.handle(req.clone(changes));
  }

  clearSlash = (url) => {
    return url[0] === '/' ? url.slice(1) : url;
  }
}
