import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tap, zip } from 'rxjs';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { PlayersService } from 'src/app/core/services/api/player.service';
import { Player } from 'src/app/core/interfaces/player';
import { PlayerDetailComponent } from 'src/app/shared/components/player-detail/player-detail.component';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { AuthStrapiService } from 'src/app/core/services/api/strapi/auth-strapi.service';
import { HttpClientProvider } from 'src/app/core/services/http/http-client.provider';
import { UsersService } from 'src/app/core/services/api/users.service';
import { User } from 'src/app/core/interfaces/user';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public loading: boolean = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClientProvider,
    private users: UsersService

  ) {
  }
  userUrl = ""
  ngOnInit(): void {
    let user: User = {
      name: 'test001',
      surname: 'kuza',
      nickname: 'nick',
      uuid: 'newwwww'
    }
    this.users.addUser(user).pipe(tap(response => {
      console.log(response);
    }),

    );
    this.loading = true;
    this.http.get("https://api.github.com/search/users?q=Kuzafkto+in%3Ausername", null, null).subscribe((result: any) => {
      this.userUrl = result.items[0].avatar_url;
    });
  }
  public goToPlayers() {
    this.router.navigate(['/players']);
  }
  public goToAbout() {
    this.router.navigate(['/about']);
  }
  public goToTeams() {
    this.router.navigate(['/teams']);

  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
