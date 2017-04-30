import * as mongoose from 'mongoose';
import {ITeam, teamSchema} from './team.model';
const Schema = mongoose.Schema;

export const matchSchema = new Schema({
  id: Schema.ObjectId,
  home: {
    scored: Number,
    team: teamSchema
  },
  away: {
    scored: Number,
    team: teamSchema
  }
});

export interface IMatch {
  readonly id: number;
  readonly home: {
    scored: number,
    team: ITeam
  };
  readonly away: {
    scored: number,
    team: ITeam
  };
}
