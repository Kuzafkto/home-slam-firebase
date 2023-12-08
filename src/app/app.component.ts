import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { User } from './core/interfaces/user';
import { AuthStrapiService } from './core/services/auth-strapi.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  lang:string = "es";
  user:User|undefined = undefined;//??
  constructor(
    public translate:CustomTranslateService,
    public auth:AuthService,
    private router:Router,
    private strapi:AuthStrapiService
  ) {
    this.translate.use(this.lang);
    this.auth.isLogged$.subscribe(logged=>{
      if(logged)
        this.router.navigate(['/home']);
    });
  }
  onLang(lang:string){
    this.lang = lang;
    this.translate.use(this.lang);
    return false;    
  }
  onSignOut(){
    this.auth.logout();
  }
}
