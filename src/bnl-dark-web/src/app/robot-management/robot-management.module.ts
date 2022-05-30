import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotDashboardComponent } from './robot-dashboard/robot-dashboard.component';
import { RobotListComponent } from './robot-list/robot-list.component';
import { RobotService } from './services/robot.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LibModule } from '../../lib/lib.module';

@NgModule({
  declarations: [
    RobotDashboardComponent,
    RobotListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    LibModule,
  ],
  providers: [
    RobotService,
  ],
})
export class RobotManagementModule {}
