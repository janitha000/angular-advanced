import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, Observable, of, shareReplay, switchMap, tap } from 'rxjs';

//to avoid duplicate calls to http, use ShareReplay

@Component({
  selector: 'app-http',
  template: `<ul *ngIf="users$ | async as users; else noData">
      <li *ngFor="let user of users.data">
        {{ user.first_name }}
      </li>
    </ul>
    <ng-template #noData>No Data is Available</ng-template>`,
})
export class HttpComponent implements OnInit {
  users$!: Observable<UserResponse>;
  sharebleUser$!: Observable<UserResponse>;
  errorObs$!: Observable<UserResponse>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const params = new HttpParams().set('page', '2');
    const headers = new HttpHeaders().set('X-CustomHeader', 'custom header value');

    this.users$ = this.http.get<UserResponse>('https://reqres.in/api/users', { params, headers }).pipe(tap((val) => console.log('Common ' + val)));

    //use for reduce duplicate http calls
    this.sharebleUser$ = this.http.get<UserResponse>('https://reqres.in/api/users').pipe(shareReplay());

    this.parallelRequests();
    this.sequentialRequests();
  }

  parallelRequests() {
    const parallel$ = forkJoin([this.http.get('https://reqres.in/api/users?page=1'), this.http.get('https://reqres.in/api/users?page=2')]);

    parallel$.subscribe((values) => {
      console.log('all values', values);
    });
  }

  sequentialRequests() {
    const sequence$ = this.http.get<UserResponse>('https://reqres.in/api/users?page=1').pipe(
      switchMap(
        (response) => {
          let page = response.page + 1;
          const params = new HttpParams().set('page', page);
          return this.http.get<UserResponse>('https://reqres.in/api/users', { params });
        },
        //selector operator
        (firstResponse, secondResponse) => [firstResponse, secondResponse],
      ), //if we need results from both obs, else it will only send 2nd obs result
    );

    sequence$.subscribe((val) => console.log('switch map ' + val[0].page + val[1].page));
  }

  errorHandling() {
    this.errorObs$ = this.http.get<UserResponse>('https://reqres.in/api/users');

    this.errorObs$.pipe(catchError((err) => of('Error loading users')));
  }
}

export interface HttpUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface UserResponse {
  data: HttpUser[];
  page: number;
}
