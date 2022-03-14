//use alternative class
// providers : [{ provide: Logger, useClass: EventLogger }]

// @Injectable()
// export class EvenBetterLogger extends Logger {
//   constructor(private userService: UserService) { super(); }

//   override log(message: string) {
//     const name = this.userService.user.name;
//     super.log(`Message to ${name}: ${message}`);
//   }
// }