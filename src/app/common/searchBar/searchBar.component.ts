import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'search-bar',
    template: require('./searchBar.html'),
    styles: [ require('./searchBar.scss') ],
    directives: [ FORM_DIRECTIVES, ROUTER_DIRECTIVES ]
})

export class SearchBarComponent {
    searchKey: string = '';
    constructor( private router: Router ) {

    }
    ngOnInit() {

    }
    onSearch() {
        if(this.searchKey === '') return;
        console.log('searchKey: ', this.searchKey);
        this.router.navigate(['/dashbroad/customer-list', { s: encodeURI(this.searchKey) }]);
    }
}
