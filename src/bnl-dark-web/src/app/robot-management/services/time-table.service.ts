import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';
import { Router } from '@angular/router';
import { ITimeTableEntry } from '../models/time-table-entry';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class TimeTableService implements ICrudService<ITimeTableEntry> {

  public constructor(private readonly _httpClient: HttpClient, private readonly _router: Router, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public async navigate() {
  }

  public get$(odataQueryString: string | undefined = undefined): Observable<ITimeTableEntry[]> {
    return this._httpClient.get<ITimeTableEntry[]>(this._baseUrl + 'odata/TimeTable' + (odataQueryString ?? ''));
  }

  public getDetail$(id: number, day: Date): Observable<ITimeTableEntry[]> {
    return this._httpClient.get<ITimeTableEntry[]>(`${ this._baseUrl }odata/TimeTable/expanded/${ id }?day=${ day.toUTCString() }`)
      .pipe(map((timetableEntries: ITimeTableEntry[]) => {
        return timetableEntries.map((timetableEntry: ITimeTableEntry) => {
          return {
            ...timetableEntry,
            startTime: new Date(timetableEntry.startTime),
          };
        });
      }));
  }

  public create$(timetable: ITimeTableEntry): Observable<ITimeTableEntry> {
    return this._httpClient.post<ITimeTableEntry>(this._baseUrl + 'odata/TimeTable',
      timetable,
    );
  }

  public patch$(timetable: ITimeTableEntry): Observable<ITimeTableEntry> {
    return this._httpClient.put<ITimeTableEntry>(this._baseUrl + 'odata/TimeTable/' + timetable.id,
      timetable,
    );
  }

  public delete$(timetable: ITimeTableEntry): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/TimeTable/' + timetable.id);
  }
}
