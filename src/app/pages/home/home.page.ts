import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { PlayersService } from 'src/app/core/services/player.service';
import { Player } from 'src/app/core/interfaces/player';
import { PlayerDetailComponent } from 'src/app/shared/components/player-detail/player-detail.component';
import { AuthStrapiService } from 'src/app/core/services/auth-strapi.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClientProvider } from 'src/app/core/services/http-client.provider';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  public loading:boolean = false;
  constructor(
    private auth:AuthStrapiService,
    private router:Router,
    private http:HttpClientProvider,

  ) {
  }
userUrl=""
  ngOnInit(): void {
    this.loading = true;
   this.http.get("https://api.github.com/search/users?q=Kuzafkto+in%3Ausername",null,null).subscribe((result:any)=>{
    this.userUrl=result.items[0].avatar_url;
   });
  }
  public goToPlayers(){
    this.router.navigate(['/players']);
  }
  public goToAbout(){
    this.router.navigate(['/about']);
  }
  public goToTeams(){
    this.router.navigate(['/teams']);

  }
  onLogout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
