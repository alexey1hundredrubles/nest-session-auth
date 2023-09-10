import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Request } from 'express';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const sessionUUID = this.extractSessionUUIDFromHeader(request);
    if (!sessionUUID) {
      throw new UnauthorizedException();
    }
    const isValid = await this.sessionService.isSessionValid(sessionUUID);
    if (!isValid) return false;

    request['sessionUUID'] = sessionUUID;
    return true;
  }

  private extractSessionUUIDFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
