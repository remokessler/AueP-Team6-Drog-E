import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AuthorizeGuard } from '../api-authorization/authorize.guard';
import { RobotListComponent } from './robot-management/robot-list/robot-list.component';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [ AuthorizeGuard ] },
  { path: 'robots', component: RobotListComponent },
];
