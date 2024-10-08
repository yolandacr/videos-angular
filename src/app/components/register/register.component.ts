import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService,
  ){
    this.page_title = "Registro";
    this.user = new User(1,'','','','','ROLE_USER','');
    this.status = '';
  }

  ngOnInit(){
    console.log(this.user);
  }

  onSubmit(form: any){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          console.log(this.status);
          form.reset();
        }else{
          this.status = 'error';
        }

      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );

  }

}
