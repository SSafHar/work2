import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    BannerListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'juan-pardo'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    ServicesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
