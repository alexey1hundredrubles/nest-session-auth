import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session, SessionSchema } from './session.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './session.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [SessionService],
  exports: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
