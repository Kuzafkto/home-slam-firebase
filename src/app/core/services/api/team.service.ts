import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Player } from '../../interfaces/player';
import { Team } from '../../interfaces/team';
import { User } from '../../interfaces/user';
import { FirebaseDocument, FirebaseService } from '../firebase/firebase.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { FirebaseAuthService } from './firebase/firebase-auth.service';
import { PlayersService } from './player.service';
import { AuthStrapiService } from './strapi/auth-strapi.service';
AuthStrapiService

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private _teams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  public teams$: Observable<Team[]> = this._teams.asObservable();

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private firebaseSvc:FirebaseService,
    private players:PlayersService,
    private firebaseAuth:FirebaseAuthService
  ) { }


  public getTeam(uuid: string): Observable<Team> {
    return from(this.firebaseSvc.getDocument("teams", uuid)).pipe(
      switchMap((doc: FirebaseDocument) => {
        // Obtener los jugadores del equipo
        const playerUUIDs: string[] = doc.data['players'].map((player: any) => player.uuid);
        // Obtener todos los jugadores y filtrar los del equipo
        return this.players.getAll().pipe(
          map((allPlayers: Player[]) => {
            const teamPlayers: Player[] = allPlayers.filter(player => {
              // Verificar si uuid es undefined antes de usarlo
              if (player.uuid !== undefined) {
                return playerUUIDs.includes(player.uuid);
              }
              return false;
            });
            // Crear el objeto Team con los jugadores filtrados
            const payload: Team = {
              uuid: doc.id,
              id: doc.data['id'],
              name: doc.data['name'],
              players: teamPlayers, // Asignación directa del arreglo teamPlayers
              trainers: doc.data['trainers'].map((trainer: { uuid: any; }) => ({ uuid: trainer.uuid }))
            };
            return payload;
          })
        );
      })
    );
  }


  public getAll():Observable<Team[]>{
    let teams:Team[]=[];

    return this.firebaseAuth.me().pipe(
      switchMap(user => {
        // Paso 2: Traer todos los players
        return from(this.firebaseSvc.getDocuments("teams")).pipe(
          switchMap((documents: FirebaseDocument[]) => {
            // Paso 3: Crear un array para los players que pertenecen al usuario
            const userTeamsIds: string[] = user.teams || [];
  
            // Paso 4: Filtrar los documentos de players que pertenecen al usuario
            const userTeams = documents.filter(doc => userTeamsIds.includes(doc.id));
  
            // Iterar sobre los documentos de players y mapearlos a objetos Player
            userTeams.forEach(doc => {
              let teamData = doc.data as Team;
              teamData.uuid=doc.id;
              // Supongo que los datos del player son del tipo Player
              teams.push(teamData);
            });
            this._teams.next(teams);
            // Paso 5: Hacer un next con el array resultante
            return of(teams);
          })
        );
      })
    );
  }

  public getAll2(): Observable<Team[]> {
    let teams: Team[] = [];
  
    return this.firebaseAuth.me().pipe(
      switchMap(user => {
        // Paso 1: Obtener todos los jugadores
        return from(this.firebaseSvc.getDocuments("players")).pipe(
          switchMap((playerDocuments: FirebaseDocument[]) => {
            // Paso 2: Obtener todos los equipos
            return from(this.firebaseSvc.getDocuments("teams")).pipe(
              switchMap((teamDocuments: FirebaseDocument[]) => {
                // Iterar sobre los documentos de equipos y mapearlos a objetos Team
                teamDocuments.forEach(teamDoc => {
                  let teamData = teamDoc.data as Team;
                  teamData.uuid = teamDoc.id;
                  
                  // Inicializar el arreglo de jugadores para este equipo
                  teamData.players = [];
  
                  // Iterar sobre los UUID de los jugadores asociados a este equipo
                  teamData.players.forEach(player => {
                    // Buscar el jugador correspondiente en el arreglo de documentos de jugadores
                    const playerDoc = playerDocuments.find(playerdocument => playerdocument.id === player.uuid);
                    if (playerDoc) {
                      // Si se encuentra el jugador, agregarlo al arreglo de jugadores del equipo
                      teamData.players.push(playerDoc.data as Player);
                    }
                  });
  
                  // Agregar el equipo al arreglo de equipos
                  teams.push(teamData);
                });
  
                // Actualizar el subject con los equipos
                this._teams.next(teams);
                
                // Emitir el arreglo de equipos
                return of(teams);
              })
            );
          })
        );
      })
    );
  }

  public addTeam(team: Team): Observable<any> {
    // Verificar si team.players es definido y no nulo antes de mapearlo
    let players = team.players ? team.players.map(player => ({ id: player.id, uuid: player.uuid })) : [];
    
    let payload = {
      ...team,
      players: players
    };
    
    return from(this.firebaseSvc.createDocument("teams", payload)).pipe(
      switchMap((created: any) => {
        const docId = created;
        return this.firebaseAuth.me().pipe(
          switchMap((user: User) => {
            if (user && user.uuid) {
              return from(this.firebaseSvc.updateDocumentField("users", user.uuid, "teams", user.teams.concat(docId))).pipe(
                map(() => payload)
              );
            } else {
              return new Observable<Team>(obs => {
                obs.error(new Error('User does not have UUID'));
              });
            }
          })
        );
      })
    );
    }
  public updateTeam(team: Team): Observable<any> {
    return new Observable<Team>(obs=>{

      if(team.uuid){
    this.firebaseSvc.updateDocument("teams",team,team.uuid);
      obs.next(team);
      }
    else{
    obs.error(new Error("Team does not have UUID"));
    }
    });
  }

  public deleteTeam(team: Team): Observable<Team> {
    return new Observable<Team>(obs=>{
      if(team.uuid){
      from (this.firebaseSvc.deleteDocument("teams",team.uuid)).subscribe(_=>{
        this.getAll().subscribe(_=>{
          obs.next(team);
        })
      });
      }
  else{
      obs.error(new Error("Team does not have UUID"));
  }
    });
  }
}
