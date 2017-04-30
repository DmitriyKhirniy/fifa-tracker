import {ITeam} from './team.model';
import {IMatch} from './match.model';
import {IUser} from './user.model';
import {ITournamentTable} from './tournament-table.model';
import {ITournament} from './tournament.model';

export interface IResponse {
  message: string;
  status: number;
}

export interface ITableController {

  /**
   * Add new team to list
   * @param team
   */
  addTeam(team: ITeam): IResponse;

  /**
   * Get team by id
   * @param id
   */
  getTeam(id: number | string): ITeam | IResponse;

  /**
   * Remove team by id
   * @param id
   */
  removeTeam(id: number | string): IResponse;

  /**
   * Get all team list
   */
  getTeams(): Array<ITeam> | IResponse;

  /**
   * Method to add new User to list
   * @param user
   */
  addUser(user: IUser): IResponse;

  /**
   * Get all Users
   */
  getUsers(): Array<ITeam> | IResponse;

  /**
   * Remove user by id
   * @param id
   */
  removeUser(id: number | string): IResponse;

  getTournament(id: number | string): ITournament | IResponse;

  /**
   * Get all match list
   */
  getTournamentMatches(tournamentId: number | string): Array<IMatch> | IResponse;

  addTournamentMatch(tournamentId: number | string, match: IMatch): ITournamentTable | IResponse;

  getTournamentTable(tournamentId: number | string): Array<ITournamentTable> | IResponse;
}
