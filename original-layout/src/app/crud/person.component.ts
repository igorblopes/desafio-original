import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PersonService } from './person.service';

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
    constructor(private _personService: PersonService)
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
