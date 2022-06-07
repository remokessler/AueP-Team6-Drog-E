import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './room-list/room-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { LibModule } from '../../lib/lib.module';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    RoomListComponent,
    MedicineListComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    LibModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
  ],
})
export class MasterDataManagementModule {}
