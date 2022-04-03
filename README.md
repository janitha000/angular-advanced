## Multiple obs$ | async pipes in a single component

- combine all of them to a single obs using combineLatest and use only one async pipe (single observable pattern)
- https://blog.angular-university.io/angular-ngif/

## OnPush common things to know

- https://blog.angular-university.io/onpush-change-detection-how-it-works/
- if input is not primitive, always change the reference of the input object. (make input object mutable)
- use spread operator for input ({name, ...rest})
- onPush will re render on Output() as well
- obs

  ```<newsletter [user]="userService.user$ | async"
      (subscribe)="subscribe($event)"></newsletter>
  ```

  - this will still work since for child it is coming as Input()

  - passing the obs as the Input()

  ```<newsletter [user$]="userService.user$" (subscribe)="subscribe($event)">
  </newsletter>
  ```

  - here if the user$ is subscribed via async in the child it will still trigger change

  - always use async pipe in child. So even if we directly have an observable injected by a service inside the child, if we use async, change detection will happen
