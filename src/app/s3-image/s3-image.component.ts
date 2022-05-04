import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s3-image',
  template: `<div>
    <h3>Local Image</h3>
    <img [src]="localImage" alt="" />
    <h3>S3 Image</h3>
    <img src="https://angular-logos.s3.ap-southeast-1.amazonaws.com/images/rule-engine-sqs.png" alt="" />
  </div>`,
})
export class S3ImageComponent implements OnInit {
  imageToDisplay!: string;
  localImage!: string;
  constructor() {}

  ngOnInit() {
    this.localImage = 'assets/rule-engine-step.png';
  }
}
