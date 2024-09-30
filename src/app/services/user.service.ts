import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{

    public url: string;
    public identity: any;
    public token;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
        this.identity = '';
        this.token = '';
    }

    prueba (){
        return 'Hola mundo desde un servicio de angular';
    }

    register(user:any):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register', params, {headers:headers});
    }

    signup(user:any, gettoken:any = null):Observable<any>{
        if(gettoken != null){
            user.gettoken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'login', params, {headers:headers});

    }

    update(token: any, user: any):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url+'user/edit', params, {headers:headers});
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity') || '{}');
        
        if (identity && Object.keys(identity).length > 0) {
            this.identity = identity;
        } else {
            this.identity = null;
        }
    
        return this.identity;
    }
    

    getToken(){
        let token = localStorage.getItem('token');
        

        if(token && token != 'undefined'){
            this.token = token;
        }else{
            this.token = '';
        }

        return this.token;
    }
}