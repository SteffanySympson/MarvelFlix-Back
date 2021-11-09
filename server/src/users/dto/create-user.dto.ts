import {
  IsString,
  Length,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Informe o nome de usuário desejado.' })
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Informe um nome de usuário com no mínimo 2 caracteres.',
  })
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Informe um endereço de e-mail válido!' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Informe uma senha entre 6 e 30 caracteres.' })
  @Length(3, 30)
  password: string;

  @IsString({ message: 'Confirme sua senha.' })
  @Length(3, 30)
  passwordConfirmation: string;
}
