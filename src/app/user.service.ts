import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { User } from '../app/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<User>;
  constructor(private router: Router) { }


  saveUser(user){
    let localStorageArray = JSON.parse(localStorage.getItem('users'));
    localStorageArray['users'].push(user);
    localStorage.setItem('users', JSON.stringify({'users' : localStorageArray['users']}));    
  }

  saveChanges(user){
    let localStorageArray = JSON.parse(localStorage.getItem('users'));
    let elem = localStorageArray['users'].find(element => element.id == user.id);
    let position = localStorageArray['users'].indexOf(elem);
    localStorageArray['users'][position] = user;
    localStorage.setItem('users', JSON.stringify({'users' : localStorageArray['users']})); 
  }

  cancelUser(){
    this.router.navigate(['/users']); 
  }

  loadUsers(){
    let localStorageItem = JSON.parse(localStorage.getItem('users'));
    return localStorageItem && localStorageItem.users;
  }

  setDemoArray(arr){
    localStorage.setItem('users', JSON.stringify({'users' : arr}))
  }

  setLocalUser(user:User):void{
    localStorage.setItem('user', JSON.stringify({'user' : user}))
  }


  deleteUser(user){
    let localStorageArray = JSON.parse(localStorage.getItem('users'));
    let newArr = localStorageArray['users'].filter(element => element.id  != user.id);
    return localStorage.setItem('users', JSON.stringify({'users' : newArr})) 
  }

  editUser(user){
    this.user = user;
    this.setLocalUser(user);
    this.router.navigate(['/edit-user'], user);
  }

  loadUser(){
    let localStorageItem = JSON.parse(localStorage.getItem('user'));
    return localStorageItem && localStorageItem.user;
  }
}
