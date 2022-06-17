import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, tap } from 'rxjs/operators';
import { QueryBuilder } from 'odata-query-builder';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICrudService } from '../models/crud-service';
import { HttpErrorResponse } from '@angular/common/http';

export interface IColumnConfig {
  title: string;
  field: string;
  queryType?: 'contains' | 'equal';
  display: (field: unknown) => string;
}

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ],
})
export class ListComponent<T> implements OnInit {
  @Input()
  public entityName: string = '';
  @Input()
  public columnConfig: IColumnConfig[] | undefined;
  @Input()
  public service: ICrudService<T> | undefined;
  @Input()
  public staticFilter: string = '';
  @Input()
  public title: string = '';

  @Output()
  public backAction = new EventEmitter();
  @Output()
  public dialogElementChanged = new EventEmitter<T>();

  @ViewChild('searchField')
  public searchField: ElementRef | undefined;

  public data$: Observable<T[]> | undefined;
  public editDialog = false;
  public sortField = '';
  public sortOrder = 0;
  public filter = '';
  public filterModelChanged$ = new Subject<string>();
  public newElement: T | undefined;
  private _filterModelChangedSubscription: Subscription;
  private _showDialogSubject$ = new BehaviorSubject<boolean>(false);

  public constructor(private readonly _confirmationService: ConfirmationService, private readonly _messageService: MessageService, private readonly _cdr: ChangeDetectorRef) {
    this._filterModelChangedSubscription = this.filterModelChanged$.pipe(
      tap((text) => {
        this.filter = text;
      }),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.loadData(this._oDataQuery);
      this.data$?.pipe(take(1)).subscribe(() => {
        setTimeout(() => this.searchField?.nativeElement.focus(), 1);
      });
    });
  }

  public get dialogTitle() {
    return !this.editDialog ? `New ${ this.entityName }` : `Edit ${ this.entityName }`;
  };

  public get showDialog$(): Observable<boolean> {
    return this._showDialogSubject$.asObservable();
  }

  private get _oDataQuery(): string {
    let query = new QueryBuilder();
    if (this.sortField) {
      query = query.orderBy(`${ this.columnConfig?.filter(c => c.title === this.sortField)[0].field } ${ this.sortOrder === -1 ? 'desc' : '' }`);
    }
    if (this.filter) {
      const containsQuery = this.columnConfig?.map(config => {
        if (config.queryType === 'contains') {
          return `contains(${ config.field },'${ this.filter }')`;
        } else if (Number(this.filter)) {
          return `${ config.field } eq ${ this.filter }`;
        }
        return '';
      })?.filter(q => q !== '');
      query = query.filter((builder) => builder.filterPhrase('(' + (containsQuery?.join(' or ') ?? '') + ')' + this.staticFilter));
    }
    else if(this.staticFilter !== '' && this.staticFilter !== undefined && this.staticFilter !== null) {
      query = query.filter(builder => builder.filterPhrase(this.staticFilter));
    }
    console.log('get query', query.toQuery());
    return query.toQuery();
  }

  public ngOnInit(): void {
    this.loadData(this._oDataQuery);
  }

  public openDialog(element: T | undefined = undefined) {
    this.editDialog = element !== undefined;
    this.newElement = { ...element } as T ?? {} as T;
    this.dialogElementChanged.emit(this.newElement);
    this._showDialogSubject$.next(true);
  }

  public closeDialog(submitted: boolean | undefined = undefined) {
    if (submitted !== true) {
      this.newElement = {} as T;
      this._showDialogSubject$.next(false);
      return;
    }

    if (this.editDialog) {
      this.updateElement();
    } else {
      this.createElement();
    }
    this.newElement = {} as T;
    this._showDialogSubject$.next(false);
  }

  public onRowSelect(clickedElement: T): void {
    this.service?.navigate({ ...clickedElement } as T);
  }

  public sort($event: { field: string, order: number }): void {
    if (this.sortField === $event.field && this.sortOrder === $event.order) {
      return;
    }
    this.sortField = $event.field;
    this.sortOrder = $event.order;
    this.loadData(this._oDataQuery);
  }

  public openDeleteDialog(element: HTMLElement, item: T): void {
    this._confirmationService.confirm({
      target: element ?? undefined,
      message: `Are you sure you want to delete this ${ this.entityName }?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service?.delete$(item).pipe(take(1)).subscribe(
          () => this.loadData(this._oDataQuery),
          (error: HttpErrorResponse) => this._messageService.add({
            severity: 'error',
            summary: `Error while deleting ${ this.entityName }`,
            detail: error.message,
            sticky: true,
          }),
        );
      },
      reject: () => {
        // nothing
      },
    });
  }

  public limit(field: any): string {
    if (!field) {
      return '';
    }
    return field.toString().length < 25 ? field.toString().substring(0, 25) : field.toString() + '...';
  }

  private updateElement(): void {
    this.service?.patch$({ ...this.newElement } as T).pipe(take(1)).subscribe(
      () => {
        this.loadData(this._oDataQuery);
        this._showDialogSubject$.next(false);
      },
      (error: HttpErrorResponse) => this._messageService.add({
        severity: 'error',
        summary: `Error while updating ${ this.entityName }`,
        detail: error.message,
        sticky: true,
      }),
    );
  }

  private createElement(): void {
    this.service?.create$({ ...this.newElement } as T).pipe(take(1)).subscribe(
      () => {
        this.loadData(this._oDataQuery);
        this._showDialogSubject$.next(false);
      },
      (error: HttpErrorResponse) => this._messageService.add({
        severity: 'error',
        summary: `Error while creating ${ this.entityName }`,
        detail: error.message,
        sticky: true,
      }),
    );
  }

  private loadData(query: string | undefined = undefined) {
    this.data$ = this.service?.get$(query);
    this.data$?.pipe(take(1)).subscribe(
      () => {
        this._cdr.detectChanges();
      },
      (error: HttpErrorResponse) => this._messageService.add({
        severity: 'error',
        summary: `Error while loading ${ this.entityName }`,
        detail: error.message,
        sticky: true,
      }),
    );
  }
}
