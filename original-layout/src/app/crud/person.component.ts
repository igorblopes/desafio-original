import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector   : 'person',
    templateUrl: './person.component.html',
    styleUrls  : ['./person.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PersonComponent implements OnInit, OnDestroy
{

    /**
     * Constructor
     */
    constructor()
    {
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

     /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }
}
