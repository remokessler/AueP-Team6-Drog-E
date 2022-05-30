import { Observable } from 'rxjs';

export interface ICrudService<T> {
  navigate$: (entity: T) => Observable<void>;
  get$: (odataQueryString?: string | undefined) => Observable<T[]>;
  patch$: (entity: T) => Observable<T>;
  create$: (entity: T) => Observable<T>;
  delete$: (entity: T) => Observable<void>;
}
