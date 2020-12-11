import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { UsersComponent } from '../app/users/users.component';
import { CreateUserFormComponent } from '../app/create-user-form/create-user-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
    {path: '', component: UsersComponent},
    {path: 'users', component: UsersComponent},
    {path: 'create-user', component: CreateUserFormComponent},
    {path: 'edit-user', component: EditUserComponent}
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
  })
  export class AppRoutingModule { }
  