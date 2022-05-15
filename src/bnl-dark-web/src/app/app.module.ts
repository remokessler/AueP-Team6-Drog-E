import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { RobotManagementModule } from './robot-management/robot-management.module';
import { LibModule } from '../lib/lib.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './user-management/guards/auth-guard.guard';
import { UserManagementModule } from './user-management/user-management.module';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    RobotManagementModule,
    LibModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    UserManagementModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [ 'localhost:44456' ],
        disallowedRoutes: []
      }
    }),
    CardModule,
    SplitButtonModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: environment, useValue: environment },
    AuthGuard
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
