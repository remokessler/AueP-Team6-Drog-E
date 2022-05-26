import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { QueryBuilder } from 'odata-query-builder';

export interface IColumnConfig {
  title: string;
  field: string;
  queryType?: 'contains' | 'equal';
}

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ],
})
export class ListComponent<T> {
  @Input()
  public data$: Observable<T[]> | undefined;
  @Input()
  public newButtonText: string = '';
  @Input()
  public columnConfig: IColumnConfig[] | undefined;

  @Output()
  public loadData = new EventEmitter<string>();
  @Output()
  public navigate = new EventEmitter<T>();
  @Output()
  public createElement = new EventEmitter<T>();
  @Output()
  public dialogElementChanged = new EventEmitter<T>();

  @ViewChild('searchField')
  public searchField: ElementRef | undefined;
  public sortField = '';
  public sortOrder = 0;
  public filter = '';
  public filterModelChanged = new Subject<string>();
  public newElement: T | undefined;
  private _filterModelChangedSubscription: Subscription;
  private _showDialogSubject$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadData.emit();
    this._filterModelChangedSubscription = this.filterModelChanged.pipe(
      tap((text) => {
        this.filter = text;
      }),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.loadData.emit(this._oDataQuery);
      setTimeout(() => this.searchField?.nativeElement.focus(), 100);
    });
  }

  public get showDialog$(): Observable<boolean> {
    return this._showDialogSubject$.asObservable();
  }

  private get _oDataQuery(): string {
    let query = new QueryBuilder();
    if (this.sortField) {
      query = query.orderBy(`${ this.sortField } ${ this.sortOrder === -1 ? 'desc' : '' }`);
    }
    if (this.filter) {
      const containsQuery = this.columnConfig?.map(config => {
        if (config.queryType === 'contains') {
          return `contains(${ config.field },'${ this.filter }')`;
        } else if(Number(this.filter)) {
          return `${config.field} eq ${this.filter}`;
        }
        return '';
      })?.filter(q => q !== '');
      query = query.filter((builder) => builder.filterPhrase(containsQuery?.join(' or ') ?? ''));
    }
    return query.toQuery();
  }

  public openDialog(element: T | undefined = undefined) {
    this.newElement = { ...element } as T ?? {} as T;
    this.dialogElementChanged.emit(this.newElement);
    this._showDialogSubject$.next(true);
  }

  public closeDialog() {
    this.createElement.emit({ ...this.newElement } as T);
    this.newElement = {} as T;
    this._showDialogSubject$.next(false);
  }

  public onRowSelect(clickedElement: T): void {
    this.navigate.emit(clickedElement);
  }

  public sort($event: { field: string, order: number }): void {
    if (this.sortField === $event.field && this.sortOrder === $event.order) {
      return;
    }
    this.sortField = $event.field;
    this.sortOrder = $event.order;
    this.loadData.emit(this._oDataQuery);
  }
}
