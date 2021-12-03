import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonRegisterComponent } from './crud/pages/register/person-register.component';
import { PersonComponent } from './crud/person.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: 'home', component: PersonComponent },
  { path: 'person', component: PersonRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
