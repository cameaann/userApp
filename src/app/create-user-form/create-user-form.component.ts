import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user-model';
import { UserService } from '../user.service';

const shortid = require('shortid');

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {
  userForm: FormGroup;
  user:User;
  statuses: string[]=['client', 'partner', 'admin'];

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      id:[shortid.generate()],
      firstName:[null, [Validators.required, 
                     Validators.minLength(3)]],
      middleName:[" "],
      lastName:[null, [Validators.required, 
                      Validators.minLength(2)]],     
      status:[null, Validators.required],
      email:[null, [Validators.email,
                    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone:[null, [Validators.required,
                    Validators.pattern(new RegExp("[0-9 ]{11}"))]],
      dateOfCreation: [new Date()],
      dateOfChange:[new Date()]
    });
    this.onChanges();    
  }

  onChanges():void{
    this.userForm.valueChanges.subscribe(val => {
        this.userService.setLocalUser(val);     
    })
  }

  onSubmit(event):void{
    if(event.submitter.name == "create"){      
      this.userService.saveUser(this.userForm.value);
      this.userForm.reset();      
    }
    if(event.submitter.name == "cancel"){
      this.userService.cancelUser();
    }
  }

  get firstName() { return this.userForm.get('firstName'); }

  get middleName() { return this.userForm.get('middleName'); }

  get lastName() { return this.userForm.get('lastName'); }

  get phone() { return this.userForm.get('phone'); }

  get email() { return this.userForm.get('email'); }

  get status() { return this.userForm.get('status'); }
}
