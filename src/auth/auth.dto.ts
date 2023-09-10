import { IsNotEmpty, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
export class SignUpDto {
  @Length(6, 15)
  login: string;

  @Length(8, 20)
  password: string;
}
