import * as mongoose from 'mongoose';
import {userSchema} from './user.model';
import {teamSchema} from './team.model';
import {tournamentSchema} from './tournament.model';
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
