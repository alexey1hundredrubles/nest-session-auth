import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { Public } from './auth.decorator';
import { SessionUUID } from 'src/session/sessionUUID.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @Public()
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto.login, signUpDto.password);
    return { success: true };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @Public()
  async signIn(
    @Body() signInDto: SignInDto,
    @Headers('User-Agent') userAgent: string,
  ) {
    const sessionId = await this.authService.signIn(
      signInDto.login,
      signInDto.password,
      userAgent,
    );
    return { sessionId };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  async signOut(@SessionUUID() sessionUUID: string) {
    await this.authService.signOut(sessionUUID);
    return { success: true };
  }
}
