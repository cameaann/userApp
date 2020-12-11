import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user-model';
import { from } from 'rxjs';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  user: User;

  @Output('userChanged')
  userEmitter= new EventEmitter<User>()

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  deleteUser(){
    this.userEmitter.emit(this.user);
  }

  editUser(){
    this.userService.editUser(this.user);    
  }

}
