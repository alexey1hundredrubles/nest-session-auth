import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({ type: Types.ObjectId })
  userId: ObjectId;

  @Prop({ type: String, index: true })
  sessionUUID: string;

  @Prop({ type: String })
  userAgent: string;

  @Prop({ type: Date })
  expiredAt: Date;

  @Prop({ type: Date })
  createdAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
