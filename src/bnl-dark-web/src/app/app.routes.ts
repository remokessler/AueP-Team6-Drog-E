import { HomeComponent } from './home/home.component';
import { RobotListComponent } from './robot-management/robot-list/robot-list.component';
import { AuthGuard } from './user-management/guards/auth-guard.guard';
import { LoginComponent } from './user-management/login/login.component';
import { RoomListComponent } from './master-data-management/room-list/room-list.component';
import { MedicineListComponent } from './master-data-management/medicine-list/medicine-list.component';
import { UserListComponent } from './master-data-management/user-list/user-list.component';
import { PatientListComponent } from './patient-management/patient-list/patient-list.component';
import { PatientDashboardComponent } from './patient-management/patient-dashboard/patient-dashboard.component';
import { RobotDashboardComponent } from './robot-management/robot-dashboard/robot-dashboard.component';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'robots', component: RobotListComponent, canActivate: [ AuthGuard ] },
  { path: 'robots/:robotId', component: RobotDashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'rooms', component: RoomListComponent, canActivate: [ AuthGuard ] },
  { path: 'medicines', component: MedicineListComponent, canActivate: [ AuthGuard ] },
  { path: 'users', component: UserListComponent, canActivate: [ AuthGuard ] },
  { path: 'patients', component: PatientListComponent, canActivate: [ AuthGuard ] },
  { path: 'patients/:patientId', component: PatientDashboardComponent, canActivate: [ AuthGuard ] },
];
