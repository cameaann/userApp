import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user-model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  users$: Observable<User[]>;
  user = this.userService.loadUser();
  statuses: string[]=['client', 'partner', 'admin'];

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [this.user.id],
      firstName:[this.user.firstName, [Validators.required, 
                                      Validators.minLength(3)]],
      middleName:[this.user.middleName],
      lastName:[this.user.lastName, [Validators.required, 
                                    Validators.minLength(2)]],     
      status:[this.user.status, Validators.required],
      email:[this.user.email, [Validators.email,
                              Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone:[this.user.phone, [Validators.required,
                                Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$"),
                                Validators.maxLength(11)]],
      dateOfCreation: [this.user.dateOfCreation],
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
    if(event.submitter.name == "save"){      
      this.userService.saveChanges(this.userForm.value);
        
    }
    if(event.submitter.name == "cancel"){
      this.userService.cancelUser();
    }
  }

  backToUsers(){
    this.router.navigate(['/users']); 
  }

  
  get firstName() { return this.userForm.get('firstName'); }

  get middleName() { return this.userForm.get('middleName'); }

  get lastName() { return this.userForm.get('lastName'); }

  get phone() { return this.userForm.get('phone'); }

  get email() { return this.userForm.get('email'); }

  get status() { return this.userForm.get('status'); }

}
