import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Video } from 'src/app/models/video';
import { User } from 'src/app/models/user';
import { VideoService } from 'src/app/services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [UserService, VideoService]
})
export class VideoDetailComponent {
  public identity: any;
  public token: any;
  public video: Video;
  public status: string;
  public user: User;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService,
    private _sanitizer: DomSanitizer
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1, this.identity.sub, '', '', '', '', null, null);
    this.status = '';
    this.user = new User(1,'','','','','ROLE_USER','');
  }

  ngOnInit(){
    this.getVideo();
  }

  getVideo(){
    this._route.params.subscribe(params => {
      var id = +params['id'];

      this._videoService.getVideo(this.token, id).subscribe(
        response => {
          if(response.status == "success"){
            this.video = response.video;
            this.user = response.video.user;
          }else{
            this._router.navigate(['/inicio'])
          }

        },
        error => {
          console.log(error);
          this.status = "error";
        }
      );
    })
  }

  getVideoIframe(url: string): SafeResourceUrl | string {
    if (!url) {
      return '';  // Si la URL es null o vacía, retorna cadena vacía
    }

    // Expresión regular para capturar solo el ID del video de cualquier URL de YouTube
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);

    const videoId = (match && match[1]) ? match[1] : null;

    if (videoId) {
      // Devuelve la URL de 'embed' segura con el ID del video
      return this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    }

    return ''; // Si no se encuentra un ID, retorna cadena vacía
  }


}
