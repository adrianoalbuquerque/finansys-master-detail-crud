import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string;
  @Input('show-button') showButton = true;
  @Input('button-class') buttonClass: string;
  @Input('button-text') butttonText: string;
  @Input('button-link') buttonLink: string;

  constructor() { }

  ngOnInit(): void {
  }

}
