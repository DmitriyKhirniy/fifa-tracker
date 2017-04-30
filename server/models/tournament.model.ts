import * as mongoose from 'mongoose';
import {matchSchema} from './match.model';
import {ITournamentTable, tournamentTableSchema} from './tournament-table.model';
const Schema = mongoose.Schema;

export const tournamentSchema = new Schema({
  title: String,
  createdDate: { type: Date, default: Date.now },
  table: [
    tournamentTableSchema
  ],
  matches: [
    matchSchema
  ],
});

export interface ITournament {
  id: number | string;
  title: string;
  createdDate: Date;
  table: Array<ITournamentTable>;
}

