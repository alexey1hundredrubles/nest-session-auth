import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { SessionModule } from 'src/session/session.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, SessionModule],
})
export class AuthModule {}
