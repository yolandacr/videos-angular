import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent {

  public page_title: string;
  public identity: any;
  public token: any;

  constructor(
    private _userService: UserService
  ){
    this.page_title = "Mis vídeos";
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
