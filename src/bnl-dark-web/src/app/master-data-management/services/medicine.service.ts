import { IMedicine } from '../models/medicine';
import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';


@Injectable({
  providedIn: 'root',
})
export class MedicineService implements ICrudService<IMedicine> {

  public constructor(private readonly _httpClient: HttpClient, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public navigate(medicine: IMedicine) {}

  public get$(odataQueryString: string | undefined = undefined): Observable<IMedicine[]> {
    return this._httpClient.get<IMedicine[]>(this._baseUrl + 'odata/Medicines' + (odataQueryString ?? ''));
  }

  public create$(medicine: IMedicine): Observable<IMedicine> {
    return this._httpClient.post<IMedicine>(this._baseUrl + 'odata/Medicines',
      {
        ...medicine,
        medicineType: Number(medicine.medicineType),
      },
    );
  }

  public patch$(medicine: IMedicine): Observable<IMedicine> {
    return this._httpClient.put<IMedicine>(this._baseUrl + 'odata/Medicines/' + medicine.id,
      {
        ...medicine,
        medicineType: Number(medicine.medicineType),
      },
    );
  }

  public delete$(medicine: IMedicine): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/Medicines/' + medicine.id);
  }
}

