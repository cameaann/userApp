import { Component, OnInit, Output } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { USERS } from '../users-db';
import { UserService } from '../user.service';
import { User } from '../user-model';
import { element, EventEmitter } from 'protractor';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  status=[
    {id:0, name:'admin', check: false},
    {id:1, name:'partner', check: false},
    {id:2, name:'client', check: false}
  ];

  searchText;
  users$;
  searchForm: FormGroup;
  displayedColumns: string[] = ['ФИО', 'телефон', 'email', 'статус'];
  showDemo = false;
  searchStatus;
 

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService) {

                this.searchForm = this.fb.group({
                  searchText: ['']
                })

                this.onChanges();
               }

  ngOnInit() {
    this.users$ = this.userService.loadUsers();
  
    if(this.users$ && this.users$.length != 0){
      this.showDemo = true;
    }
  }
  onChanges():void{
    this.searchForm.valueChanges.subscribe(val => {
      this.searchText = val.searchText;     
      })
  }

  setDemoUsers(){
    this.userService.setDemoArray(USERS);    
    this.ngOnInit();
  }

  addUser(){
    this.router.navigate(['/create-user']); 
  }

  deleteUser(user:User){
    console.log(user);
    this.userService.deleteUser(user);
    this.ngOnInit();
  }

  updateList(val){
    this.status[val].check = !this.status[val].check;
    this.searchStatus = this.getStatus(this.status);
  }

  getStatus(list){
    let filteredList;
    const everyUnchecked = list.every(e => !e.check);
  
    if(everyUnchecked){
      filteredList = list;  
      return filteredList.map(e => e.name);   
    }else{
      filteredList = list.filter(e => e.check);
    }
      return filteredList.map(e => e.name);   
  }
}


