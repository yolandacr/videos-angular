import { Component } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public page_title: string;
  public user: User;

  constructor(){
    this.page_title = "Registro";
    this.user = new User(1,'','','','','ROLE_USER','');
  }

  ngOnInit(){
    console.log(this.user);
  }

  onSubmit(form: any){
    console.log(this.user);

  }

}
