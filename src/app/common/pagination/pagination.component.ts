import { Component, Input, Output, NgZone,EventEmitter,OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'pagination',
  template: require('./pagination.html'),
  styles: [require('./pagination.scss')],
})

export class PaginationComponent implements OnInit {
  @Input('current') current:number;
  @Input('limit') limit:number;
  @Input('total') total:number;
  @Output('changePage') changePage = new EventEmitter();
  jumpPage:number = null;
  curPage:number = 1;
  pageSize:number = null;
  pages:any = [];
  maxSize:number;
  rotate:number;
  totalPages:number = 0;
  constructor() {

  }

  ngOnInit() {
    this.maxSize = 7;
    this.rotate = 0;
    this.totalPages = _.ceil(Math.max(1,this.total/this.limit));
    this.pages = this.getPages(this.current,this.totalPages);
  }

  getPages(currentPage, totalPages) {
      var pages = [];
      // Default page limits
      var startPage = 1;
      var endPage = totalPages;
      var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
      // recompute if maxSize
      if (isMaxSized) {
          if (this.rotate) {
              // Current page is displayed in the middle of the visible ones
              startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
              endPage = startPage + this.maxSize - 1;
              // Adjust if limit is exceeded
              if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = endPage - this.maxSize + 1;
              }
          } else {
              // Visible pages are paginated with maxSize
              startPage = Math.ceil(Math.min(currentPage / this.maxSize,1)-1) * this.maxSize + 1;
              // Adjust last page if limit is exceeded
              endPage = Math.min(startPage + this.maxSize-1, totalPages);
          }
      }
      // Add page number links
      for (var num = startPage; num <= endPage; num++) {
          var page = this.makePage(num, num.toString(), num === currentPage);
          pages.push(page);
      }
      // Add links to move between page sets
      if (isMaxSized && !this.rotate) {
          if (startPage > 1) {
              var previousPageSet = this.makePage(startPage - 1, '......', false);
              pages.unshift(previousPageSet);
          }
          if (endPage < totalPages) {
              var nextPageSet = this.makePage(endPage + 1, '......', false);
              pages.push(nextPageSet);
          }
      }
      return pages;
  };

  makePage(num, text, isActive) {
      return {
          number: num,
          text: text,
          active: isActive
      };
  };

  noPrevious() {
      return this.current === 1;
  };
  noNext() {
      return this.current === this.totalPages;
  };

  clkPage(cur){
    this.current = cur;
    this.changePage.next(this.current);
  }

  gotoPage(cur){
    if(cur==1||cur==0){
      return false;
    }
    if(cur==this.totalPages){
      return false;
    }
    this.clkPage(cur);
  }

  jumpToPage(){
    this.current = this.jumpPage;
    this.changePage.next(this.current);
  }

}
