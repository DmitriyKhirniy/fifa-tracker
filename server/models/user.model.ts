import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const userSchema = new Schema({
  id: Schema.ObjectId,
  name: String,
  age: Number
});

export interface IUser {
  readonly id: number;
  readonly name: string;
  readonly age: number;
}
