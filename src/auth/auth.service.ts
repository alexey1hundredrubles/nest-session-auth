import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
  ) {}

  async signUp(login: string, password: string) {
    const user = await this.usersService.findOne(login);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await this.usersService.create(login, hashPassword);
  }

  async signIn(login: string, password: string, userAgent: string) {
    const user = await this.usersService.findOne(login);
    if (!user) throw new UnauthorizedException();
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException();

    const sessionUUID = await this.sessionService.create(user._id, userAgent);

    return sessionUUID;
  }

  async signOut(sessionUUID: string) {
    this.sessionService.remove(sessionUUID);
  }
}
