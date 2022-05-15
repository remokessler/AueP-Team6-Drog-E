import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { LibModule } from '../../lib/lib.module';


@NgModule({
  declarations: [
    LoginComponent,
    UserPopupComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LibModule
  ],
  exports: [ LoginComponent, CommonModule, FormsModule, ReactiveFormsModule, UserPopupComponent ]
})
export class UserManagementModule {}
