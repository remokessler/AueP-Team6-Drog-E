import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotDashboardComponent } from './robot-dashboard/robot-dashboard.component';
import { RobotListComponent } from './robot-list/robot-list.component';
import { RobotService } from './services/robot.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

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
  ],
  providers: [
    RobotService
  ]
})
export class RobotManagementModule {}
