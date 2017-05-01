import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IUser} from '../../../server/models/user.model';
import {IResponse} from '../../../server/models/table-cotroller.model';
import {ITeam} from '../../../server/models/team.model';
import {ITournament} from "../../../server/models/tournament.model";

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  public createTournament(tournament: ITournament, tableId: string): Observable<IResponse> {
    return this.http.post('/api/tournament', {tournament, tableId})
      .map(res => res.json());
  }

  public getTournament(tableId: string, tournamentId: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('tableId', tableId.toString());
    return this.http.get(`/api/tournament/${tournamentId}` , {search: params})
      .map(res => res.json());
  }

  public getTournamentTable(tableId: string, tournamentId: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('tableId', tableId.toString());
    return this.http.get(`/api/tournament/table/${tournamentId}` , {search: params})
      .map(res => res.json());
  }

  public addEntityToTournamentTable(body: any): Observable<any> {
    return this.http.post('/api/tournament/table' , body)
      .map(res => res.json());
  }

  public addTable(table: any): Observable<any> {
    return this.http.post('/api/table', table)
      .map(res => res.json());
  }

  public addNewUser(user: IUser, id: string): Observable<IResponse> {
    return this.http.post('/api/user', {user, id})
      .map(res => res.json());
  }

  public addNewTeam(team: ITeam, userId: string, tableId: string): Observable<any> {
    return this.http.post('/api/team', {
      team,
      userId,
      tableId
    })
      .map(res => res.json());
  }

  public getUsers(tableId: string): Observable<Array<IUser> | IResponse> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('tableId', tableId.toString());
    return this.http.get('/api/users', {search: params})
      .map(res => res.json());
  }

  getCats(id: string | number): Observable<any> {
    return this.http.get(`/api/table/${id}`).map(res => res.json());
  }

  countCats(): Observable<any> {
    return this.http.get('/api/cats/count').map(res => res.json());
  }

  addCat(cat): Observable<any> {
    return this.http.post('/api/cat', JSON.stringify(cat), this.options);
  }

  getCat(cat): Observable<any> {
    return this.http.get(`/api/cat/${cat._id}`, this.options);
  }

  editCat(cat): Observable<any> {
    return this.http.put(`/api/cat/${cat._id}`, JSON.stringify(cat), this.options);
  }

  deleteCat(cat): Observable<any> {
    return this.http.delete(`/api/cat/${cat._id}`, this.options);
  }

}
