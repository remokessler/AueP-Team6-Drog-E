import { HomeComponent } from './home/home.component';
import { RobotListComponent } from './robot-management/robot-list/robot-list.component';
import { AuthGuard } from './user-management/guards/auth-guard.guard';
import { LoginComponent } from './user-management/login/login.component';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'robots', component: RobotListComponent, canActivate: [AuthGuard] },
];
