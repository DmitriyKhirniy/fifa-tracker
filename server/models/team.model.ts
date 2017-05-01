import * as mongoose from 'mongoose';
import {IUser, userSchema} from './user.model';
const Schema = mongoose.Schema;

export const teamSchema = new Schema({
  id: Schema.ObjectId,
  title: String,
  user: userSchema
});

export interface ITeam {
  readonly id?: number;
  readonly title: string;
  user?: IUser;
}
