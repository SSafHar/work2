import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerListComponent } from './banner-list/banner-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', component: BannerListComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
