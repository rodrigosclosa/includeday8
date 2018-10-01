import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import {Headers} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public feeds: Array<string>;
  private url: string = "https://www.reddit.com/new.json";

  private urlVisao: string = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/06dd314b-a244-4491-95ff-8d5619c97896/url";
  private imagemBase64: string = '';
  private imgPreview: any = 'assets/imgs/blank.png';
  private imgBlob: Blob;
  private urlimagem: string = "";
  public predictions: Array<string>;

  constructor(public navCtrl: NavController, public http: Http) {
  }

  carregar() {
    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.feeds = data.data.children;
        // Exibindo conteúdo do array no console do browser
        console.log(this.feeds);
      });
    }

  analisarImagem() {
    if(this.urlimagem == "") {
      alert("URL obrigatória!");
    } else {
      this.imgPreview = this.urlimagem;
      this.enviarVisaoMicrosoft(this.urlimagem);
    }
  }

  enviarVisaoMicrosoft(imagem) {
    let headers = new Headers();
    headers.append('Prediction-Key', 'd5e7cb01b00f499ba1b791ad20cda48a');
    headers.append('Content-Type', 'application/json');

    let body = `{"Url": "${imagem}"}`;

    this.http.post(this.urlVisao, body, { headers }).map(res => res.json())
      .subscribe(data => {
        // Exibindo conteúdo do array no console do browser
        console.log(data);
        if(data && data.predictions) {
          this.predictions = data.predictions;
          console.log(this.predictions);
        } 
      });
  }

}
