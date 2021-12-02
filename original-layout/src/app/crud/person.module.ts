import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PersonComponent } from './person.component';
import { PersonService } from './person.service';
import { PersonRegisterComponent } from './pages/register/person-register.component';
import { PersonListComponent } from './pages/list/person-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';






const routes: Routes = [
    {
        path     : 'person',
        component: PersonComponent
    },
    {
        path     : 'person/:idPerson',
        component: PersonRegisterComponent
    },
    {
        path     : 'person/new',
        component: PersonRegisterComponent
    }
];
@NgModule({
    declarations: [
        PersonRegisterComponent,
        PersonListComponent,
        PersonComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatRadioModule,
        MatSnackBarModule,
        MatDialogModule
        
    ],
    providers   : [
        PersonService,
        DatePipe    
    ]
})
export class PersonModule
{
}
