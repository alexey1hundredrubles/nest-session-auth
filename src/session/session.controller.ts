import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionUUID } from './sessionUUID.decorator';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getMySession(@SessionUUID() sessionUUID: string) {
    return await this.sessionService.findOne(sessionUUID);
  }
}
