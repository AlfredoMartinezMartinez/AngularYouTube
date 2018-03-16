import { Component, OnInit } from '@angular/core';
import {YoutubeService} from '../../providers/youtube.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos:any[]=[];
  videoSel:any;

  constructor(public _ys:YoutubeService) {
    this._ys.getVideos().subscribe(vid =>{
        // console.log(vid);
        this.videos=vid;
      });

   }

  ngOnInit() {
  }

  cargarMas(){
    this._ys.getVideos().subscribe(vid =>{
        // console.log(vid);
        this.videos.push.apply(this.videos,vid);
      });

  }

  vervideo(video:any){
    this.videoSel=video;
    $('#exampleModal').modal();
  }

  cerrarModal(){
    this.videoSel = null;
    $('#exampleModal').modal('hide');
  }



}
