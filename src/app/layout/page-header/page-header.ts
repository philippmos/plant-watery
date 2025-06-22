import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.scss']
})
export class PageHeader {
  @Input({ required: true }) title!: string;
}
