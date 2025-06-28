import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html'
})
export class PageHeader {
  @Input({ required: true }) title!: string;
}
