import * as mongoose from 'mongoose';
import {userSchema} from './user.model';
import {teamSchema} from './team.model';
import {matchSchema} from './match.model';
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  title: String,
  createdDate: { type: Date, default: Date.now },
  table: [
    {
      id: Schema.ObjectId,
      scored: Number,
      missed: Number,
      games: Number,
      points: Number,
      difference: Number,
      series: [
        {
          value: String
        }
      ],
      team: teamSchema
    }
  ],
  matches: [
    matchSchema
  ],
});

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
