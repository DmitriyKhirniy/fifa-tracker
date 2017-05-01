import * as mongoose from 'mongoose';
import {ITeam, teamSchema} from './team.model';
const Schema = mongoose.Schema;

export const tournamentTableSchema = new Schema(
  {
    id: Schema.ObjectId,
    scored: Number,
    missed: Number,
    games: Number,
    points: Number,
    difference: Number,
    series: [
      {
        value: String,
        matchId: String
      }
    ],
    team: teamSchema
  }
);

export interface ITournamentTable {
  id: number;
  scored: number;
  missed: number;
  games: number;
  difference: number;
  points: number;
  series: [{
      value: string,
      matchId: number
  }];
  team: ITeam;
}
