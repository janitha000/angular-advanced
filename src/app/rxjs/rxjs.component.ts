import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, zip, combineLatest } from 'rxjs';
import { combineLatestWith, debounceTime, distinctUntilChanged, map, mergeMap, switchMap, take, takeLast, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { RxjsService } from './rxjs.service';

@Component({
  selector: 'app-rxjs',
  template: `<p *ngIf="mapObs$ | async as value">map: {{ value }}</p>
    <p *ngIf="tapObs$ | async as value">tap: {{ value }} - will not do the manupulation</p>
    <p *ngIf="debounceObs$ | async as value">debounce: {{ value }} - wait until 5 seconds</p>
    <p>distinctObs: {{ distinctObs$ | async }}</p>`,
})
export class RxjsComponent implements OnInit {
  onDestroy$: Subject<void> = new Subject();

  mapObs$!: Observable<number>;
  tapObs$!: Observable<number>;
  shareObs$!: Observable<string>;
  shareObs2$!: Observable<string>;
  switchMapObs$!: Observable<string>;
  debounceObs$!: Observable<number>;
  distinctObs$!: Observable<number>;

  constructor(private obsService: RxjsService) {}

  ngOnInit() {
    this.map();
    this.tap();
    this.share();
    this.switchMap();
    this.debounceTime();
    this.distinctUntilChanged();
    this.take();
    this.zip();
    this.combineLatest();
  }

  ngOnDestoy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  //transform/manupulate the data
  map() {
    this.mapObs$ = this.obsService.getCommonObs().pipe(map((number) => number * 2));
  }

  //transform/manupulate without changing the original obs (for logging etc... )
  tap() {
    this.tapObs$ = this.obsService.getCommonObs().pipe(tap((number) => number * 2));
  }

  //share duplicate subscribing so only need to subscribe once
  //can be used to send only one http call in a component
  share() {
    //share is done at the service
    this.shareObs$ = this.obsService.getSharedObs();
    this.shareObs2$ = this.obsService.getSharedObs();

    this.shareObs$.pipe(takeUntil(this.onDestroy$)).subscribe();
    this.shareObs2$.pipe(takeUntil(this.onDestroy$)).subscribe();
    //there won't be 2 subscriptions since it is being shared
  }

  switchMap() {
    //cancel first obs and move in to the second obs with the data from first obs
    let firstObs$: Observable<number> = this.obsService.getCommonObs();
    let secondObs$: Observable<string> = this.obsService.getStringObs();

    this.switchMapObs$ = firstObs$.pipe(
      switchMap((number) =>
        secondObs$.pipe(
          tap((string) => {
            console.log('switchMap ' + number);
            console.log('switchMap ' + string);
          }),
        ),
      ),
    );

    this.switchMapObs$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  //merge all obs and only subscribe until all of them emit atleast once
  //if one source emit multiple times, those will be used when others are also emited
  //if one is emitted again, it will wait until all of them are emitted without showing (like combineLatest)
  zip() {
    let obs1$ = this.obsService.getCommonObs();
    let obs2$ = this.obsService.getNumberObs();
    let obs3$ = this.obsService.getStringObs();
    let emit$ = this.obsService.obs$;

    console.log('[zip] before emit no results');

    let output$ = zip(obs1$, obs2$, obs3$, emit$).pipe(tap((x) => console.log('zip ' + x)));
    output$.pipe(takeUntil(this.onDestroy$)).subscribe();

    console.log('[zip] emit 1');
    this.obsService.emitNumber(1);

    console.log('[zip] emit 2, but no results from zip since other obs have not emitted');
    this.obsService.emitNumber(2);
  }

  // behave like zip, wait until every one emits atleast one
  // then even when one of them emit it will return with prev value + emitted value
  combineLatest() {
    let obs1$ = this.obsService.getCommonObs();
    let obs2$ = this.obsService.getNumberObs();
    let obs3$ = this.obsService.getStringObs();
    let emit$ = this.obsService.obs$;

    console.log('[combineLatest] before emit no results');

    let output$ = combineLatest([obs1$, obs2$, obs3$, emit$]).pipe(tap((x) => console.log('combineLatest ' + x)));
    output$.pipe(takeUntil(this.onDestroy$)).subscribe();

    console.log('[combineLatest] emit 1');
    this.obsService.emitNumber(1);

    console.log('[combineLatest] emit 2, have results with prev values + new emitted value');
    this.obsService.emitNumber(2);
  }

  //wait until a certian time before subscribing
  debounceTime() {
    this.debounceObs$ = this.obsService.getCommonObs().pipe(
      debounceTime(5000),
      tap((string) => console.log('debounce time ' + string)),
    );
  }

  distinctUntilChanged() {
    this.distinctObs$ = this.obsService.obs$.pipe(
      distinctUntilChanged(),
      tap((a) => console.log('distinct until change ' + a)),
    );
    this.obsService.emitNumber(1);
    this.obsService.emitNumber(2);
  }

  take() {
    let obs$ = this.obsService.clickObs().pipe(take(1)); //only get the first
    obs$.pipe(takeUntil(this.onDestroy$)).subscribe(() => console.log('take(1) : document clicked'));

    let counter = 0;
    let obs2$ = this.obsService.clickObs().pipe(takeWhile(() => counter < 10)); //only get the first
    obs2$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      console.log('takeWhile() : document clicked ' + counter);
      counter++;
    });
    obs2$.pipe(takeUntil(this.onDestroy$)).subscribe();

    let source = of(1, 2, 3, 4);
    let obs3$ = source.pipe(takeLast(2));
    obs3$.pipe(takeUntil(this.onDestroy$)).subscribe((val) => console.log('take last ' + val));
  }
}
