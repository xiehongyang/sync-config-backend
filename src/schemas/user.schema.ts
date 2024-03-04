import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;
@Schema({
  timestamps: true
})
export class User {

  @Prop({ required: true, type: String, unique: true })
  googleId;
  @Prop({ required: true, type: String, unique: true })
  email;
  @Prop({ type: String })
  name;
  @Prop({ type: String })
  picture;
}

export const UserSchema = SchemaFactory.createForClass(User);