import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BreadcrumbService } from './services/breadcrumb.service';
import { DialogComponent } from './dialog/dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    DialogComponent
  ],
  providers: [
    BreadcrumbService
  ]
})
export class LibModule {}
