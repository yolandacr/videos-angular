import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, VideoService]
})
export class HomeComponent {

  public page_title: string;
  public identity: any;
  public token: any;
  public videos: any;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
  ){
    this.page_title = "Mis vídeos";
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.loadUser();
    this.getVideos();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(){
    this._videoService.getVideos(this.token).subscribe(
      response => {
     
          this.videos = response.videos;
         
        
      },
      error => {
 
        console.log(error);
      }
    );
  }

}
