import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, zip, combineLatest, from, fromEvent } from 'rxjs';
import {
  combineLatestWith,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  map,
  mergeMap,
  startWith,
  switchMap,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators';
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

  constructor(private obsService: RxjsService, private http: HttpClient) {}

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
    this.startWith();
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
    //cancel first obs previose subs and move in to the second obs with the data from first obs
    //good when searching using http calls, if the search term becomes different the first obs will be cancelled(http call)
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

  //works same as switchMap, but it will not cancel the first call
  //will not wait until first obs is completed(like concatMap)
  //good when we need to send multiple different http calls based on a parameter or send requests parellel
  mergeMap() {
    let obs1$ = from([1, 2, 3, 4]);
    const getObs2 = (param: number) => of(`calling http using ${param}`);

    obs1$.pipe(
      mergeMap((val) => this.http.post(`http://${val}`, val)), //this will not wait until obs1$ is completed. So multiple subs can be there in a given time
      //if order of these http calls matter then use concatMap
    );
  }

  //trigger subscription sequntially
  //the second will be only called when the first obs is completed
  concatMap() {
    let obs1$ = this.obsService.getCommonObs();
    let obs2$ = this.obsService.getNumberObs();

    obs1$.pipe(concatMap((val) => obs2$));
    //or
    obs1$.pipe(concatMap((val) => this.http.post(`http://${val}`, val))); //this will make sure whatever saving will be save sequentially
    //if new value comes to obs$ it will wait until the prev http call is finished
  }

  //ignore subsequent emits until prev is completed
  //ex:- trigger http call on a button click- if user click multiple clicks we can ignore the subsequent clicks
  //this will not ignore all the subsequent clicks, only while there is already a http call is processing
  //if we want only one click we can use first() or take(1)
  exhaustMap() {
    fromEvent(document, 'click').pipe(exhaustMap((val) => this.http.post(`http://${val}`, val)));
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

  //use in scenarios like in search user type and then backspace, we can ignore this since it was already emitted
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

  //provide a default value if there are no emiting at the start
  startWith() {
    let obs$ = of();
    obs$.pipe(startWith(1), takeUntil(this.onDestroy$)).subscribe((val) => console.log('start with: ' + val));
  }
}
