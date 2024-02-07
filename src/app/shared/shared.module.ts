import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HttpClient } from '@angular/common/http';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PositionSelectorComponent } from './components/position-selector/position-selector.component';
import { NamePipe } from './pipes/name.pipe';
import { PositionImageDirective } from './directives/position-image.directive';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/services/custom-translate.service';
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';




@NgModule({
  declarations: [
    //Directifes
    //Pipes
    //Components
    PlayerDetailComponent,
    LoginFormComponent,
    PlayerInfoComponent,
    TeamDetailComponent,
    TeamInfoComponent,
    AppToolbarComponent,
    PositionSelectorComponent,
      RegisterFormComponent,
      NamePipe,
      PositionImageDirective,
      
      
      ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
    
  ],
  exports:[
    CommonModule, 
    IonicModule, 
    FormsModule,
    //Directifes
    //Pipes
    //Components
    PlayerDetailComponent,
    AppToolbarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PlayerInfoComponent,
    TeamDetailComponent,
    TeamInfoComponent,
    PositionSelectorComponent,
    PositionImageDirective,
    TranslateModule,
  ]
})
export class SharedModule { }
