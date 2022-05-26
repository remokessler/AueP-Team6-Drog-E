import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BreadcrumbService } from './services/breadcrumb.service';
import { DialogComponent } from './dialog/dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { IColumnConfig, ListComponent } from './list/list.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DialogComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    SkeletonModule,
    TableModule,
    InputTextModule,
    FormsModule,
  ],
  exports: [
    DialogComponent,
    ListComponent,
  ],
  providers: [
    BreadcrumbService,
  ],
})
export class LibModule {}
