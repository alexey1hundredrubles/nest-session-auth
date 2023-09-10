import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String })
  login: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  refreshToken: string;

  @Prop({ type: String })
  userAgent: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
