import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/schemas/user.schema";


export type WorkDocument = HydratedDocument<Work>;
@Schema({
  timestamps: true
})
export class Work {

  @Prop( { required: true, type: String, unique: true })
  uuid;
  @Prop({ type: String })
  title;
  @Prop({ type: String})
  description;
  @Prop({ type: Object })
  content;
  @Prop({type: Boolean, default: false})
  isStar;
  @Prop({type: Boolean, default: false})
  isDelete;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const WorkSchema = SchemaFactory.createForClass(Work);