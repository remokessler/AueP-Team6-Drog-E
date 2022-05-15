import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotDashboardComponent } from './robot-dashboard/robot-dashboard.component';
import { RobotListComponent } from './robot-list/robot-list.component';
import { RobotService } from './services/robot.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { LibModule } from '../../lib/lib.module';

@NgModule({
  declarations: [
    RobotDashboardComponent,
    RobotListComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    InputTextModule,
    SkeletonModule,
    LibModule,
  ],
  providers: [
    RobotService
  ]
})
export class RobotManagementModule {}
