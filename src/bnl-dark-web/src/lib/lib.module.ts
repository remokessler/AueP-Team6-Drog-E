import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BreadcrumbService } from './services/breadcrumb.service';


@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    BreadcrumbService
  ]
})
export class LibModule {}
