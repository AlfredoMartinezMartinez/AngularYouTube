import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private youtubeUrl:string= "https://www.googleapis.com/youtube/v3";
  private youtubeUrlAuto:string="&autoplay=1&loop=1";
  private apikey:string= "AIzaSyA-APAmEyzwlqbbswBRsbDBlv_qoHw8eCU";
  private playlist:string= "UU4lWfhhFK94PzbXdj8izDEA";

  private nextPageToken:string= "";

  constructor(public http:Http) { }

  getVideos(){
    let url=`${this.youtubeUrl}/playlistItems`;
    let params= new URLSearchParams();
    params.set('part','snippet');
    params.set('maxResults','10');
    params.set('playlistId',this.playlist);
    params.set('key',this.apikey);

    if(this.nextPageToken){
      params.set('pageToken',this.nextPageToken);
    }

    return this.http.get(url,{search:params}).map(res=>{
      console.log(res.json());
      this.nextPageToken=res.json().nextPageToken;

      let videos:any[]=[];
      for(let video of res.json().items){
        let snippet = video.snippet;
        videos.push(snippet);
      }
      return videos;
    })

  }

}
