import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatGridListModule, MatToolbarModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatGridListModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class ComponentsMaterialModule {}
