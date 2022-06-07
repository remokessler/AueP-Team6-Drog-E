import { IPatient } from '../models/patient';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IAmnesisRecord } from '../models/amnesis-record';


@Injectable({
  providedIn: 'root',
})
export class PatientService implements ICrudService<IPatient> {

  public constructor(private readonly _httpClient: HttpClient, private readonly _router: Router, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public async navigate(patient: IPatient) {
    await this._router.navigate([ `/patients/${ patient.id }` ]);
  }

  public get$(odataQueryString: string | undefined = undefined): Observable<IPatient[]> {
    return this._httpClient.get<IPatient[]>(this._baseUrl + 'odata/Patients' + (odataQueryString ?? '')).pipe(map(patients => {
      return patients.map(p => ({
        ...p,
        birthday: new Date(p.birthday),
      }));
    }));
  }

  public getDetail$(id: number): Observable<IPatient> {
    return this._httpClient.get<IPatient>(`${ this._baseUrl }odata/Patients/${ id }`).pipe(
      map(patient => {
        return {
          ...patient,
          birthday: new Date(patient.birthday),
        };
      }),
    );
  }

  public create$(patient: IPatient): Observable<IPatient> {
    return this._httpClient.post<IPatient>(this._baseUrl + 'odata/Patients',
      patient,
    );
  }

  public patch$(patient: IPatient): Observable<IPatient> {
    return this._httpClient.put<IPatient>(this._baseUrl + 'odata/Patients/' + patient.id,
      patient,
    );
  }

  public delete$(patient: IPatient): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/Patients/' + patient.id);
  }
}
