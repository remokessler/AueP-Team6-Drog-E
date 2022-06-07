import { Component } from '@angular/core';
import { IColumnConfig } from '../../../lib/list/list.component';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IMedicine, MedicineType } from '../models/medicine';
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
      display: (field: any) => MedicineType[field],
    },
    {
      title: 'Dispenser',
      field: 'dispenser',
    },
  ] as IColumnConfig[];

  public medicineTypes = Object.entries(MedicineType).map(([ value, index ]) => ({
    value,
    index,
  })).filter(x => !Number.isInteger(x.index));

  public constructor(private readonly _medicineService: MedicineService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Medicine' } ]);
  }

  public get medicineService() {
    return this._medicineService;
  }

  public dialogElementChanged($event: IMedicine): void {
    this.dialogMedicine = $event;
    if (this.dialogMedicine.medicineType === undefined || this.dialogMedicine.medicineType === null) {
      this.dialogMedicine.medicineType = MedicineType.Unknown;
    }
  }

  public asNumber(value: string): number {
    return Number(value);
  }
}
