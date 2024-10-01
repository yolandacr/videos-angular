import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  public page: number;
  public next_page: number;
  public prev_page: number;
  public number_pages: number [];

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.page_title = "Mis vídeos";
    this.page = 1;
    this.next_page = 1;
    this.prev_page = 1;
    this.number_pages = [];
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.loadUser();
 
    this._route.params.subscribe(params => {
      var page = +params['page']

      if(!page){
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }
      this.getVideos(page);
    }

    )
 
   
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(page: number){
    this._videoService.getVideos(this.token, page).subscribe(
      response => {
     
          this.videos = response.videos;
          var number_pages = []

          for (let i = 0; i < response.total_pages; i++) {
            number_pages.push(i);
            this.number_pages = number_pages;

            if(page >=2){
              this.prev_page = page-1;
            }else{
              this.prev_page = 1;
            }

            if(page < response.total_pages){
              this.next_page = page + 1;
            }else{
              this.next_page = response.total_pages;
            }
            
          }
         
        
      },
      error => {
 
        console.log(error);
      }
    );
  }

  getThumb(url: string, size: string = 'mqdefault'): string {
    const defaultImage = 'https://img.youtube.com/vi/000/0.jpg';
  
    if (!url) {
      return defaultImage;
    }
  
    // Expresiones regulares para capturar el ID de YouTube
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
  
    if (match && match[2].length === 11) {
      const videoId = match[2];
      return `https://img.youtube.com/vi/${videoId}/${size}.jpg`;
    } else {
      return defaultImage; // Si no es una URL válida de YouTube, retorna la imagen por defecto
    }
  }
  
  
   

}
