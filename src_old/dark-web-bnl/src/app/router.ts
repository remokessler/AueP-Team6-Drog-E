import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AuthorizeGuard } from '../api-authorization/authorize.guard';
import { RobotsOverviewComponent } from './robots/robots-overview/robots-overview.component';

const routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    // canActivate: [AuthorizeGuard]
  },
  // {
  //   path: '**',
  //   redirectTo: '/authentication/login'
  // },
  {
    path: 'robots',
    component: RobotsOverviewComponent,
    canActivate: [AuthorizeGuard]
  },
  {
    path: 'fetch-data',
    component: FetchDataComponent,
    canActivate: [AuthorizeGuard]
  }
] as Routes;

export default routes;
