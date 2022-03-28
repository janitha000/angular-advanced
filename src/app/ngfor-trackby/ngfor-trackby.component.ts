import { Component, OnInit } from '@angular/core';

//track by is needed when object reference are changed, then angular will re render even though the object is same, but reference is changed
@Component({
  selector: 'app-track-by',
  template: `<ul>
    <li *ngFor="let movie of movies; trackBy: trackByFn">
      {{ movie.title }}
    </li>
  </ul>`,
})
export class TrackByComponent implements OnInit {
  movies: any[] = [];
  constructor() {
    this.movies = [
      { title: 'Zootopia', director: 'Byron Howard, Rich Moore' },
      { title: 'Batman v Superman: Dawn of Justice', director: 'Zack Snyder' },
      {
        title: 'Captain American: Civil War',
        director: 'Anthony Russo, Joe Russo',
      },
      { title: 'X-Men: Apocalypse', director: 'Bryan Singer' },
      { title: 'Warcraft', director: 'Duncan Jones' },
    ];
  }

  ngOnInit() {}

  trackByFn(index: number, item: any) {
    return item.title;
  }

  //track by multiple items
  trackByFnMultipleFields(index: number, item: any) {
    return item.title + item.director;
  }
}
