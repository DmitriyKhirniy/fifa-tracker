import * as mongoose from 'mongoose';
import {IUser, userSchema} from './user.model';
import {ITeam, teamSchema} from './team.model';
import {ITournament, tournamentSchema} from './tournament.model';
const Schema = mongoose.Schema;


const listSchema = new Schema({
  teams: [
    teamSchema
  ],
  users: [
    userSchema
  ],
  tournaments: [
    tournamentSchema
  ]
});

export const FIFA_Tracker = mongoose.model('FIFA_Tracker' , listSchema);

export interface ITable {
  teams: Array<ITeam>;
  users: Array<IUser>;
  tournaments: Array<ITournament>;
}
