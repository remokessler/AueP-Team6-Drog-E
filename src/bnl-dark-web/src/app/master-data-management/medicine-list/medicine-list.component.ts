import { Component, OnInit } from '@angular/core';
import { IColumnConfig } from '../../../lib/list/list.component';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IMedicine } from '../models/medicine';
import { MedicineService } from '../services/medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: [ './medicine-list.component.scss' ],
})
export class MedicineListComponent {
  public dialogMedicine = {} as IMedicine;
  public columnConfig = [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'Name',
      field: 'name',
      queryType: 'contains',
    },
    {
      title: 'Lat. Name',
      field: 'latinName',
      queryType: 'contains',
    },
    {
      title: 'Type',
      field: 'medicineType',
      queryType: 'contains',
    },
    {
      title: 'Dispenser',
      field: 'dispenser',
    },
  ] as IColumnConfig[];

  public constructor(private readonly _medicineService: MedicineService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Medicine' } ]);
  }

  public get medicineService() {
    return this._medicineService;
  }
}
